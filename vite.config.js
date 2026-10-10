import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Belt-and-suspenders against "React is not defined" in environments whose JSX
  // transform ends up falling back to classic mode (e.g. a Node/toolchain
  // mismatch between the Azure build environment and local dev): this injects
  // `import React from "react"` into every transformed file, so React is always
  // in scope no matter which JSX runtime mode is actually active.
  esbuild: {
    jsxInject: `import React from "react"`
  }
});
