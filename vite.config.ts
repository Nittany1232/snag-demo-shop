import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/snag-demo-shop/",
  plugins: [react()],
});
