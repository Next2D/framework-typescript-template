const path = require("path");
const env = require("@next2d/env");

const ESLintPlugin = require("eslint-webpack-plugin");
const Next2DWebpackTypescriptAutoLoaderPlugin = require("@next2d/webpack-typescript-auto-loader-plugin");
const object = env();

module.exports = {
    "mode": "development",
    "entry": path.resolve(__dirname, "src/index.ts"),
    "output": {
        "filename": "app.js",
        "path": path.resolve(__dirname, `dist/web/${object.environment}`)
    },
    "resolve": {
        "alias": {
            "@": path.resolve(__dirname, "src")
        },
        "extensions": [".ts", ".js"]
    },
    "module": {
        "rules": [
            {
                "test": /\.(png|svg|jpg|jpeg|gif)$/i,
                "type": "asset/inline"
            },
            {
                "test": /\.ts$/,
                "loader": "ts-loader"
            }
        ]
    },
    "plugins": [
        // If you use eslint, please uncomment it.
        new ESLintPlugin({
            "extensions": [".ts", ".js"],
            "exclude": "node_modules"
        }),
        new Next2DWebpackTypescriptAutoLoaderPlugin(object, { "LICENSE": false })
    ],
    "devServer": {
        "static": [
            { "directory": path.resolve(__dirname, `dist/web/${object.environment}`) },
            { "directory": path.resolve(__dirname, "mock") }
        ],
        "watchFiles": "src/config/*.json",
        "historyApiFallback": true,
        "compress": false,
        "open": true
    },
    "watchOptions": {
        "ignored": [
            path.resolve(__dirname, "src/config/Config.ts"),
            path.resolve(__dirname, "src/Packages.ts")
        ]
    },
    "performance": {
        "hints": false
    }
};
