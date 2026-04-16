import {
  ACCENT_PRESETS,
  FONT_PRESETS,
  HEADING_FONT_PRESETS,
  PALETTE_PRESETS,
  RADIUS_PRESETS,
  SPACING_PRESETS,
} from "@softuq/react/presets";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Fraunces, Inter, Lora, Playfair_Display } from "next/font/google";
import { Providers } from "./_components/providers";
import { SETTINGS_STORAGE_KEY, THEME_STORAGE_KEY } from "./_components/storage-keys";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://softuq.com"),
  title: {
    default: "Softuq — Design System for AI-Era Projects",
    template: "%s — Softuq",
  },
  description:
    "Components, blocks, and page templates with copy-paste distribution. Own the code, theme via tokens, deploy today.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://softuq.com",
    siteName: "Softuq",
    title: "Softuq — Design System for AI-Era Projects",
    description:
      "Components, blocks, and page templates with copy-paste distribution. Own the code, theme via tokens, deploy today.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Softuq — Design System for AI-Era Projects",
    description:
      "Components, blocks, and page templates with copy-paste distribution. Own the code, theme via tokens, deploy today.",
  },
  alternates: {
    canonical: "https://softuq.com",
  },
};

const PRESET_MAP = JSON.stringify({
  palette: PALETTE_PRESETS,
  accent: ACCENT_PRESETS,
  radius: RADIUS_PRESETS,
  spacing: SPACING_PRESETS,
  font: FONT_PRESETS,
  headingFont: HEADING_FONT_PRESETS,
});

// Pre-hydration script: applies saved theme + tokens before first paint
// Avoids flash of defaults on page load / iframe mount.
const initScript = `(function(){try{
var root=document.documentElement;
var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
if(t==='light'||t==='dark')root.setAttribute('data-theme',t);
var raw=localStorage.getItem(${JSON.stringify(SETTINGS_STORAGE_KEY)});
if(!raw)return;
var s=JSON.parse(raw);
var P=${PRESET_MAP};
var st=root.style;
function apply(sec,key){var v=key&&P[sec]&&P[sec][key];if(v)for(var k in v)st.setProperty(k,v[k]);}
apply('palette',s.palette);apply('accent',s.accent);apply('radius',s.radius);
apply('spacing',s.spacing);apply('font',s.font);apply('headingFont',s.headingFont);
}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${GeistSans.variable} ${GeistMono.variable} ${lora.variable} ${playfair.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
