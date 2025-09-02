// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import partytown from '@astrojs/partytown';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
const isProd = process.env.NODE_ENV === "production";
export default defineConfig({
    vite: {
        optimizeDeps: {
            include: ['react-dropzone'],
        },

        ssr: {
            noExternal: ['react-dropzone', 'react-icons']
        },

        plugins: [tailwindcss()],
    },
    integrations: [react(), partytown({
        config: {
            forward: ['pdfjs-dist']
        }
    })],
    base: isProd ? "/assistant" : "/",
});