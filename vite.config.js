import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/news-explorer-frontend/",
  // add the server object
  server: {
    port: 3000,
  },
});
