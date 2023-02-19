// vite.config.ts
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins: [solidPlugin()],
    server: {
        proxy: {
            '/api': {
                target: 'https://localhost:2022',
                changeOrigin: true,
                secure: false,
            }
        }
    }
});