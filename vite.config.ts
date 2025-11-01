import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [react()],
  base: '/Steam-family/',
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('https://tfpthgjbnwkzeirixyta.supabase.co'),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmcHRoZ2pibndremVpcml4eXRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NTMzNjksImV4cCI6MjA3NzMyOTM2OX0.npqaLJMja1-1dgO8QJFBb5nvSWhYne7xjNZUl69_JoY'),
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, "client/index.html"),
        404: path.resolve(import.meta.dirname, "client/public/404.html")
      }
    }
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
