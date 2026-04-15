import { spawn } from "node:child_process";
import path from "node:path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(): Promise<Response> {
  const repoRoot = path.resolve(process.cwd(), "..", "..");
  const skillParent = path.join(repoRoot, "skills");
  const skillDir = "softuq";

  // Stream a gzipped tarball of skills/softuq/ using the system tar binary.
  const child = spawn("tar", ["-czf", "-", "-C", skillParent, skillDir], {
    stdio: ["ignore", "pipe", "pipe"],
  });

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      child.stdout.on("data", (chunk) => controller.enqueue(new Uint8Array(chunk)));
      child.stdout.on("end", () => controller.close());
      child.on("error", (err) => controller.error(err));
      child.on("exit", (code) => {
        if (code !== 0 && code !== null) {
          controller.error(new Error(`tar exited with code ${code}`));
        }
      });
    },
    cancel() {
      child.kill();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/gzip",
      "Content-Disposition": `attachment; filename="softuq.tar.gz"`,
      "Cache-Control": "public, max-age=300",
    },
  });
}
