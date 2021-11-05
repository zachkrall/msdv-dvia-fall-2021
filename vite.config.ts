import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    root: './www/',
    base: './',
    build: {
        outDir: '../dist/',
        emptyOutDir: true
    },
    plugins: [react()]
})
