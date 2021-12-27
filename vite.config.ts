import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svg from 'vite-plugin-react-svg'

export default defineConfig({
    root: './www/',
    base: './',
    publicDir: './public',
    build: {
        outDir: '../dist/',
        emptyOutDir: true
    },
    plugins: [react(), svg()]
})
