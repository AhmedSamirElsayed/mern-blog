import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000", // Use IPv4 address
        secure: false,
        // changeOrigin: true, // Changes the origin of the host header to the target URL
      },
    },
  },
  plugins: [react()],
});
