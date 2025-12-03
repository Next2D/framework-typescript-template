# Mock Images

ローカル開発用のモック画像を格納するディレクトリです。

Directory for storing mock images for local development.

## 概要 / Overview

開発環境で使用する画像ファイル（アイコン、サムネイル、背景など）を配置します。`http://localhost:5173/img/` でアクセス可能です。

Place image files (icons, thumbnails, backgrounds, etc.) used in the development environment. Accessible at `http://localhost:5173/img/`.

## ファイル一覧 / File List

### favicon.png

アプリケーションのファビコンです。

Application favicon.

**アクセスURL:** `http://localhost:5173/img/favicon.png`

## 使用方法 / Usage

### 1. 画像の配置

開発に必要な画像をこのディレクトリに配置します。

Place images needed for development in this directory.

### 2. アクセス

開発サーバー経由で画像にアクセスします。

Access images through the development server.

```typescript
// 画像URLの例
const imageUrl = "http://localhost:5173/img/favicon.png";
```

```html
<!-- HTMLでの使用例 -->
<link rel="icon" href="/img/favicon.png" />
```

## モック画像の追加 / Adding Mock Images

### 手順 / Steps

1. 画像ファイルを準備（PNG, JPG, SVG, WebP など）
2. このディレクトリに配置
3. 開発サーバーからアクセスをテスト

### 対応フォーマット / Supported Formats

- PNG - 透過が必要な画像に推奨
- JPG/JPEG - 写真などに推奨
- SVG - アイコンやベクター画像に推奨
- WebP - 軽量な画像に推奨
- GIF - アニメーション画像に使用

## 注意事項 / Notes

- モック画像は開発環境でのみ使用してください
- 本番環境では適切なCDNや画像サーバーを設定してください
- 大きなファイルは開発サーバーのパフォーマンスに影響する可能性があります
- `routing.json` のパス設定と重複しないように注意してください

- Use mock images only in development environments
- Set up appropriate CDN or image server for production environments
- Large files may affect development server performance
- Be careful not to conflict with path settings in `routing.json`

## 関連ドキュメント / Related Documentation

- [../README.md](../README.md) - Mockディレクトリの説明
- [../../src/assets/README.md](../../src/assets/README.md) - インライン画像
