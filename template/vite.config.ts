/// <reference types="vitest" />

import { defineConfig } from "vite";
import path from "path";
import autoLoader from "@next2d/vite-auto-loader-plugin";

const port: number = 5173;
export default defineConfig({
    "base": "./",
    "optimizeDeps": {
        "disabled": true
    },
    "build": {
        "outDir": "dist",
        "target": "esnext",
        "modulePreload": {
            "polyfill": false
        },
        "rollupOptions": {
            "output": {
                "entryFileNames": "assets/js/app.js"
            }
        }
    },
    "plugins": [
        autoLoader()
    ],
    "server": {
        "open": "index.html",
        "port": port,
        "proxy": {
            "/content": {
                "target": `http://localhost:${port}`,
                "rewrite": (path) => path.replace(/^\/content/, "/mock/content")
            },
            "/api": {
                "target": `http://localhost:${port}`,
                "rewrite": (path) => path.replace(/^\/api/, "/mock/api")
            }
        }
    },
    "resolve": {
        "alias": {
            "@": path.resolve(process.cwd(), "./src")
        }
    },
    "test": {
        "globals": true,
        "environment": "jsdom",
        "include": ["src/**/*.test.ts"]
    }
});