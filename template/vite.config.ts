/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import path from "path";
import autoLoader from "@next2d/vite-plugin-next2d-auto-loader";

export default defineConfig({
    "base": "./",
    "build": {
        "outDir": "dist",
        "target": "esnext",
        "chunkSizeWarningLimit": 1024,
        "modulePreload": {
            "polyfill": false
        },
        "rolldownOptions": {
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
            "@": path.resolve(import.meta.dirname, "src")
        }
    },
    "test": {
        "globals": true,
        "environment": "jsdom",
        "server": {
            "deps": {
                // 公開版の @next2d/* は拡張子なしの ESM import を含むため Vite で変換する
                "inline": [/\/node_modules\/@next2d\//]
            }
        },
        "setupFiles": [
            "@vitest/web-worker",
            "vitest-webgl-canvas-mock"
        ],
        "include": ["src/**/*.test.ts"]
    }
});