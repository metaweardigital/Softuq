import { AlertCircle, AlertTriangle, CheckCircle2, Info, Terminal, X } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Alert, AlertDescription, AlertTitle } from "./alert";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "info" | "success" | "error" | "warning";
  duration?: number;
}

interface ToastContextValue {
  toasts: (Toast & { exiting?: boolean })[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  pauseToast: (id: string) => void;
  resumeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

type ToastPosition = "left" | "center" | "right";

const ToastPositionContext = React.createContext<ToastPosition>("right");

interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
}

function ToastProvider({ children, position = "center" }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<(Toast & { exiting?: boolean })[]>([]);
  const timersRef = React.useRef<
    Map<string, { timer: ReturnType<typeof setTimeout>; remaining: number; start: number }>
  >(new Map());

  const dismissToast = React.useCallback((id: string) => {
    timersRef.current.delete(id);
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  const pauseToast = React.useCallback((id: string) => {
    const entry = timersRef.current.get(id);
    if (!entry) return;
    clearTimeout(entry.timer);
    entry.remaining -= Date.now() - entry.start;
  }, []);

  const resumeToast = React.useCallback(
    (id: string) => {
      const entry = timersRef.current.get(id);
      if (!entry || entry.remaining <= 0) return;
      entry.start = Date.now();
      entry.timer = setTimeout(() => dismissToast(id), entry.remaining);
    },
    [dismissToast],
  );

  const addToast = React.useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).slice(2);
      const duration = toast.duration || 4000;
      setToasts((prev) => [...prev, { ...toast, id }]);

      const timer = setTimeout(() => dismissToast(id), duration);
      timersRef.current.set(id, { timer, remaining: duration, start: Date.now() });
    },
    [dismissToast],
  );

  const removeToast = dismissToast;

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, pauseToast, resumeToast }}>
      <ToastPositionContext.Provider value={position}>
        {children}
        <ToastViewport />
      </ToastPositionContext.Provider>
    </ToastContext.Provider>
  );
}

/* --- ToastItem --- */
interface ToastItemProps {
  toast: Toast & { exiting?: boolean };
  onClose: () => void;
}

const toastIconMap: Record<string, React.ElementType> = {
  default: Terminal,
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
};

const toastToAlertVariant: Record<string, "default" | "info" | "success" | "warning" | "destructive"> = {
  default: "default",
  info: "info",
  success: "success",
  warning: "warning",
  error: "destructive",
};

const enterAnimationMap: Record<ToastPosition, string> = {
  left: "animate-slide-in-left",
  center: "animate-fade-up",
  right: "animate-slide-in-right",
};

function ToastItem({ toast, onClose }: ToastItemProps) {
  const Icon = toastIconMap[toast.variant || "default"];
  const alertVariant = toastToAlertVariant[toast.variant || "default"];
  const position = React.useContext(ToastPositionContext);
  const { pauseToast, resumeToast } = useToast();
  const ref = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number | undefined>(undefined);
  const [clipOverflow, setClipOverflow] = React.useState(false);

  React.useEffect(() => {
    if (ref.current && height === undefined) {
      setHeight(ref.current.offsetHeight);
    }
  }, [height]);

  React.useEffect(() => {
    if (toast.exiting) {
      const t = setTimeout(() => setClipOverflow(true), 50);
      return () => clearTimeout(t);
    }
    setClipOverflow(false);
  }, [toast.exiting]);

  return (
    <div
      className={cn("transition-all duration-300 ease-smooth", clipOverflow ? "overflow-hidden" : "overflow-visible")}
      style={{
        maxHeight: toast.exiting ? 0 : (height ?? 200) + 16,
        opacity: toast.exiting ? 0 : 1,
        marginBottom: toast.exiting ? -8 : 0,
        transform: toast.exiting ? "translateY(100%)" : "translateY(0)",
      }}
      onMouseEnter={() => pauseToast(toast.id)}
      onMouseLeave={() => resumeToast(toast.id)}
    >
      <div ref={ref}>
        <Alert
          variant={alertVariant}
          className={cn(
            "pointer-events-auto w-full max-w-sm shadow-neu-floating",
            "text-xs pr-10",
            !toast.exiting && enterAnimationMap[position],
          )}
        >
          <Icon />
          {toast.title && <AlertTitle className="truncate">{toast.title}</AlertTitle>}
          {toast.description && <AlertDescription className="line-clamp-2">{toast.description}</AlertDescription>}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 shrink-0 rounded-[var(--ds-radius-tooltip)] p-0.5 text-text-muted hover:text-text-primary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </Alert>
      </div>
    </div>
  );
}

/* --- ToastViewport --- */
const positionClasses: Record<ToastPosition, string> = {
  left: "fixed bottom-4 left-4 items-start",
  center: "fixed bottom-4 left-1/2 -translate-x-1/2 items-center",
  right: "fixed bottom-4 right-4 items-end",
};

function ToastViewport() {
  const { toasts, removeToast } = useToast();
  const position = React.useContext(ToastPositionContext);

  return (
    <div className={cn("z-toast flex flex-col gap-2 pointer-events-none", positionClasses[position])}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

export type { Toast, ToastItemProps, ToastPosition };
export { ToastItem, ToastProvider, useToast };
