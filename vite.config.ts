import path from "node:path";
import { defineConfig } from "vite";

function resolve(...args: string[]): string {
  return path.join(__dirname, ...args);
}

export default defineConfig({
  publicDir: false,
  define: {},
  resolve: {
    alias: {
      "@/*": resolve("/*"),
    },
  },
  server: {
    fs: {
      cachedChecks: false,
    },
    open: "/example/index.html",
  },
  build: {
    outDir: "dist",
    minify: true,

    lib: {
      entry: {
        index: resolve("lib/index.ts"),
      },
      name: "index",
      formats: ["cjs", "es"],
    },
  },
});
