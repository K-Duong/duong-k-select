import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "pathe"
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./src/lib/index.tsx"),
      name: "kduongLib",
      fileName: "kduong-react-select",
      formats: ["es", "cjs", "umd", "iife"]
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        },
      }
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [react(), dts()],
})
