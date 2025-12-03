# TypeScript Type Definitions

グローバルな型定義ファイルを格納するディレクトリです。

Directory for storing global TypeScript type definition files.

## 役割 / Role

このディレクトリには、TypeScriptコンパイラに認識させるグローバルな型定義を配置します。

This directory contains global type definitions to be recognized by the TypeScript compiler.

## ファイル / Files

### window.d.ts

グローバルな `Window` インターフェースの拡張定義を行います。

Extends the global `Window` interface.

```typescript
// 例: グローバル変数の型定義
// Example: Type definition for global variables
declare global {
    interface Window {
        customProperty: string;
    }
}
```

## 使用方法 / Usage

1. このディレクトリに `.d.ts` ファイルを配置します
2. `tsconfig.json` の `include` または `typeRoots` に含まれていることを確認します

1. Place `.d.ts` files in this directory
2. Ensure it's included in `tsconfig.json`'s `include` or `typeRoots`

## 注意事項 / Notes

- アプリケーション固有のインターフェースは `src/interface/` に配置してください
- このディレクトリはグローバルスコープの型拡張にのみ使用します

- Place application-specific interfaces in `src/interface/`
- Use this directory only for global scope type extensions

## 関連ドキュメント / Related Documentation

- [interface/README.md](../src/interface/README.md) - アプリケーション固有のインターフェース
- [tsconfig.json](../tsconfig.json) - TypeScript設定
