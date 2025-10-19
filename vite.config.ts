import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "framer-motion": ["framer-motion"],
          "ui-vendor": ["react-simple-typewriter", "react-hot-toast"],
          icons: ["lucide-react", "react-icons", "@radix-ui/react-icons"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
