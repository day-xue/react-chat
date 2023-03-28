import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import viteEslint from "vite-plugin-eslint"
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: { "@": "/src/" },
  },
  plugins: [
    react(),
    viteEslint({
      failOnError: false,
    }),
  ],
  base: "./",
})
