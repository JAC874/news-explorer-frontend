import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/news-explorer-frontend/",
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist", // Make sure the build output is correct
  },
});
