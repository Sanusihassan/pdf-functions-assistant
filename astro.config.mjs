// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import partytown from '@astrojs/partytown';

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
    },
    integrations: [react(), partytown({
        config: {
            forward: ['pdfjs-dist']
        }
    })],
    base: isProd ? "/assistant" : "/",
});
