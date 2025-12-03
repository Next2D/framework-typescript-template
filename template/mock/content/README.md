# Mock Content

ローカル開発用のモックコンテンツデータを格納するディレクトリです。

Directory for storing mock content data for local development.

## 概要 / Overview

Animation Toolからエクスポートされたコンテンツのモックデータを配置します。`http://localhost:5173/content/` でアクセス可能です。

Place mock data for content exported from the Animation Tool. Accessible at `http://localhost:5173/content/`.

## ファイル一覧 / File List

### sample.json

サンプルのコンテンツデータです。

Sample content data.

**アクセスURL:** `http://localhost:5173/content/sample.json`

## 使用方法 / Usage

### 1. コンテンツデータの配置

Animation Toolからエクスポートしたデータ、または開発用のダミーデータを配置します。

Place data exported from the Animation Tool or dummy data for development.

### 2. アクセス

開発サーバー経由でコンテンツにアクセスします。

Access content through the development server.

```typescript
const response = await fetch("http://localhost:5173/content/sample.json");
const data = await response.json();
```

## モックコンテンツの追加 / Adding Mock Content

### 手順 / Steps

1. コンテンツデータ（JSON形式）を作成
2. このディレクトリに配置
3. 開発サーバーからアクセスをテスト

## 注意事項 / Notes

- モックコンテンツは開発環境でのみ使用してください
- 本番環境では実際のコンテンツサーバーを設定してください
- `routing.json` のパス設定と重複しないように注意してください

- Use mock content only in development environments
- Set actual content server in production environments
- Be careful not to conflict with path settings in `routing.json`

## 関連ドキュメント / Related Documentation

- [../README.md](../README.md) - Mockディレクトリの説明
- [../../file/README.md](../../file/README.md) - n2dファイルの格納場所
- [../../src/ui/content/README.md](../../src/ui/content/README.md) - Animation Toolコンテンツ
