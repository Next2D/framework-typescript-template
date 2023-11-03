import { defineConfig } from "vite";
import path from "path";
import env from "@next2d/env";
import autoLoader from "@next2d/vite-typescript-auto-loader-plugin";

const port: number = 5173;
export default defineConfig({
    "build": {
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
    "plugins": [autoLoader(env())],
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
            "@": path.resolve(__dirname, "./src")
        }
    },
    "test": {
        "globals": true,
        "environment": "jsdom"
    }
});