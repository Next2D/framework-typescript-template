# Images

インラインで利用したい画像・JSONなど静的ファイルを格納するディレクトリです。

This directory stores static files such as images and JSON to be used inline.

## 概要 / Overview

ビルド時にバンドルに含めたい静的アセットを配置します。Viteのインポート機能を利用して、画像やJSONデータをインラインで使用できます。

Place static assets that you want to include in the bundle at build time. You can use images and JSON data inline using Vite's import functionality.

## 使用例 / Usage

### 画像のインポート / Importing Images

```typescript
import logoImage from "@/assets/logo.png";

// logoImageはビルド時に解決されたURLになります
// logoImage will be a resolved URL at build time
const shape = new Shape();
await shape.load(logoImage);
```

### JSONのインポート / Importing JSON

```typescript
import animation from "@/assets/animation.json";

// AnimationToolで書き出したJSONは直接インポートできます
// JSON exported from AnimationTool can be imported directly.
const loader = new Loader();
await loader.loadJSON(animation);
```

## ディレクトリ構造の例 / Example Directory Structure

```
assets/
├── images/
│   ├── logo.png
│   └── icons/
│       └── home.svg
└── json/
    └── animation.json
```

## assetsとmockの使い分け / Difference between assets and mock

| 項目 / Item | assets | mock |
|-------------|--------|------|
| **用途 / Purpose** | バンドルに含める | 開発サーバーで配信 |
| **アクセス方法 / Access** | importで取得 | URL経由でfetch |
| **ビルド / Build** | バンドルに含まれる | 含まれない |
| **使用場面 / Use case** | アプリ内で直接使用 | API模擬・外部リソース |

## 対応フォーマット / Supported Formats

- **画像 / Images**: PNG, JPG, SVG, WebP, GIF
- **データ / Data**: JSON(Animation Tool)
- **その他 / Others**: Viteがサポートする形式

## 関連ドキュメント / Related Documentation

- [../mock/README.md](../../mock/README.md) - 開発用モックデータ
- [Vite Asset Handling](https://vitejs.dev/guide/assets.html) - Viteのアセット処理