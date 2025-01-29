/// <reference types="vitest" />

import { defineConfig } from "vite";
import path from "path";
import autoLoader from "@next2d/vite-auto-loader-plugin";

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
            "@": path.resolve(process.cwd(), "./src")
        }
    },
    "test": {
        "globals": true,
        "environment": "jsdom",
        "setupFiles": [
            "test.setup.ts",
            "@vitest/web-worker",
            "vitest-webgl-canvas-mock"
        ],
        "include": ["src/**/*.test.ts"]
    }
});