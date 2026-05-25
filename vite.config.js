import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [react({ include: /\.(jsx?|tsx?)$/ }), VitePWA({ registerType: 'autoUpdate' })],
    base: '/',
    resolve: {
        extensions: ['.jsx', '.js', '.tsx', '.ts'],
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.js',
        env: {
            VITE_SUPABASE_URL: 'https://placeholder.supabase.co',
            VITE_SUPABASE_ANON_KEY: 'placeholder-key',
        },
        coverage: {
            provider: 'v8',
        },
    },
})

