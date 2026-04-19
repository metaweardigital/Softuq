import { existsSync } from "node:fs";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import type { Registry } from "./registry.js";

const BASE_URL = process.env.SOFTUQ_REGISTRY_URL ?? "https://softuq.com";
const CACHE_DIR = path.join(os.homedir(), ".softuq", "cache");
const MANIFEST_CACHE = path.join(CACHE_DIR, "registry.json");
const CACHE_TTL_MS = 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 3000;

export interface RemoteManifest {
  version: string;
  generatedAt: string;
  frameworks: Record<string, Registry>;
}

async function fetchWithTimeout(url: string): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return res.ok ? res : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function readCachedManifest(): Promise<RemoteManifest | null> {
  if (!existsSync(MANIFEST_CACHE)) return null;
  try {
    const info = await stat(MANIFEST_CACHE);
    if (Date.now() - info.mtimeMs > CACHE_TTL_MS) return null;
    const raw = await readFile(MANIFEST_CACHE, "utf-8");
    return JSON.parse(raw) as RemoteManifest;
  } catch {
    return null;
  }
}

async function writeCachedManifest(manifest: RemoteManifest): Promise<void> {
  try {
    await mkdir(CACHE_DIR, { recursive: true });
    await writeFile(MANIFEST_CACHE, JSON.stringify(manifest, null, 2));
  } catch {
    // Cache is best-effort.
  }
}

export async function fetchRemoteManifest(): Promise<RemoteManifest | null> {
  const cached = await readCachedManifest();
  if (cached) return cached;

  const res = await fetchWithTimeout(`${BASE_URL}/registry.json`);
  if (!res) return null;

  try {
    const manifest = (await res.json()) as RemoteManifest;
    await writeCachedManifest(manifest);
    return manifest;
  } catch {
    return null;
  }
}

export async function fetchRemoteFile(framework: string, relPath: string): Promise<string | null> {
  const url = `${BASE_URL}/r/${framework}/${relPath}`;
  const res = await fetchWithTimeout(url);
  if (!res) return null;
  try {
    return await res.text();
  } catch {
    return null;
  }
}

export function remoteBaseUrl(): string {
  return BASE_URL;
}
