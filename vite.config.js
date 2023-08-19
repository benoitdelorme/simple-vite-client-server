// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
    root: ".",
    publicDir: 'public',
    build: {
        outDir: 'dist',
    },
    server: {
        host: 'localhost',
        port: '3000',
        portStrict: true,
        https: false
    },
    plugins: []
})