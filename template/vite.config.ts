/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import path from "path";
import autoLoader from "@next2d/vite-plugin-next2d-auto-loader";

export default defineConfig({
    "base": "./",
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
        "port": 5173,
        "proxy": {
            "/content": {
                "target": "http://localhost:5173",
                "rewrite": (path) => path.replace(/^\/content/, "/mock/content")
            },
            "/api": {
                "target": "http://localhost:5173",
                "rewrite": (path) => path.replace(/^\/api/, "/mock/api")
            }
        }
    },
    "resolve": {
        "alias": {
            "@": path.resolve(__dirname, "src")
        }
    },
    "test": {
        "globals": true,
        "environment": "jsdom",
        "setupFiles": [
            "@vitest/web-worker",
            "vitest-webgl-canvas-mock"
        ],
        "include": ["src/**/*.test.ts"]
    }
});