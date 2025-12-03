# Mock API

ローカル開発用のモックAPIデータを格納するディレクトリです。

Directory for storing mock API data for local development.

## 概要 / Overview

開発環境でAPIレスポンスをシミュレートするためのJSONファイルを配置します。`http://localhost:5173/api/` でアクセス可能です。

Place JSON files to simulate API responses in the development environment. Accessible at `http://localhost:5173/api/`.

## ファイル一覧 / File List

### home.json

Home画面用のモックAPIレスポンスです。

Mock API response for the Home screen.

```json
{
    "word": "Hello, Next2D!"
}
```

**アクセスURL:** `http://localhost:5173/api/home.json`

### top.json

Top画面用のモックAPIレスポンスです。

Mock API response for the Top screen.

```json
{
    "title": "Welcome"
}
```

**アクセスURL:** `http://localhost:5173/api/top.json`

## 使用方法 / Usage

### 1. JSONファイルの作成

APIレスポンスの構造に合わせたJSONファイルを作成します。

Create JSON files that match the API response structure.

### 2. configでエンドポイントを設定

`src/config/config.json` の `local` 環境でモックサーバーを指定します。

Specify the mock server in the `local` environment of `src/config/config.json`.

```json
{
    "local": {
        "api": {
            "endPoint": "http://localhost:5173/"
        }
    }
}
```

### 3. Repositoryからアクセス

Repositoryクラスでモックデータにアクセスします。

Access mock data from Repository classes.

```typescript
const response = await fetch(`${config.api.endPoint}api/home.json`);
const data = await response.json();
```

## モックデータの追加 / Adding Mock Data

### 手順 / Steps

1. 対応するインターフェースを確認（`src/interface/`）
2. インターフェースに合わせたJSONファイルを作成
3. このディレクトリに配置
4. Repositoryからアクセスをテスト

### 例 / Example

```typescript
// src/interface/IUserResponse.ts
export interface IUserResponse {
    id: string;
    name: string;
    email: string;
}

// mock/api/user.json
{
    "id": "user-001",
    "name": "Test User",
    "email": "test@example.com"
}
```

## 注意事項 / Notes

- モックデータは開発環境でのみ使用してください
- 本番環境では実際のAPIエンドポイントを設定してください
- `routing.json` のパス設定と重複しないように注意してください

- Use mock data only in development environments
- Set actual API endpoints in production environments
- Be careful not to conflict with path settings in `routing.json`

## 関連ドキュメント / Related Documentation

- [../README.md](../README.md) - Mockディレクトリの説明
- [../../src/config/README.md](../../src/config/README.md) - 環境設定
- [../../src/model/infrastructure/README.md](../../src/model/infrastructure/README.md) - Repository層
