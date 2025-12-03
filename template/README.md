# Getting Started with Create Next2D App

This project was bootstrapped with [Create Next2D App](https://github.com/Next2D/create-next2d-app).

## Architecture

このプロジェクトは **MVVM + Clean Architecture + Atomic Design** を採用しています。  
アーキテクチャの詳細は [ARCHITECTURE.md](./ARCHITECTURE.md) を参照してください。

This project adopts **MVVM + Clean Architecture + Atomic Design**.  
See [ARCHITECTURE.md](./ARCHITECTURE.md) for architecture details.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.  
The page will reload when you make changes.  

## Start the emulator for each platform.

### `npm run preview:windows -- --env prd`
### `npm run preview:macos -- --env prd`
### `npm run preview:linux -- --env prd`
### `npm run preview:ios -- --env prd`
### `npm run preview:android -- --env prd`

Launch emulators for various platforms including Windows, macOS, Linux, iOS, Android, and Web (HTML).
You can check the operation of the application in the environment specified by env=***.

### `npm run generate`

Generate the necessary View and ViewModel classes from the routing JSON file.

## Unit Test

### `npm test`

Launches the test runner.

## Build

### `npm run build:web -- --env prd`
### `npm run build:steam:windows -- --env prd`
### `npm run build:steam:macos -- --env prd`
### `npm run build:steam:linux -- --env prd`
### `npm run build:ios -- --env prd`
### `npm run build:android -- --env prd`

Multi-platform builder, writes to various platforms including macOS, Windows, iOS, Android, and Web (HTML).  
Builds apps for the environment specified by env=***.