import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: mode === 'test' ? [] : [react()],
  test: {
    globals: true,
    environment: "node", // Usando node para o teste simples
  },
  server: {
    proxy: {
      "/api/": {
        target: "http://localhost:5220",
        changeOrigin: true,
      },
    },
  },
}));
