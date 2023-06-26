import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const generateScopedName = mode === "production" ? "[hash:base64]" : "[local]__[hash:base64:2]";
  return {
    plugins: [react()],
    css: {
      modules: {
        localsConvention: "camelCase",
        generateScopedName,
      },
    },
  };
});
