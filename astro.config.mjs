import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import partytown from '@astrojs/partytown';

const isProd = process.env.NODE_ENV === "production";
export default defineConfig({
    vite: {
        optimizeDeps: {
            include: ['react-dropzone', 'pdfequips-navbar'],
        },
        ssr: {
            noExternal: ['react-dropzone', 'pdfequips-navbar', 'react-icons']
        }
    },
    integrations: [react(), partytown({
        config: {
            forward: ['pdfjs-dist']
        }
    })],
    base: isProd ? "/assistant" : "/",
});