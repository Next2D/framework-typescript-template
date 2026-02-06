# Configuration Files

設定ファイルは `src/config/` ディレクトリに配置。

## stage.json

表示領域(Stage)の設定。

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `width` | number | 240 | 表示領域の幅 |
| `height` | number | 240 | 表示領域の高さ |
| `fps` | number | 60 | 描画回数/秒 (1-60) |
| `options` | object | null | オプション設定 |

### Stage Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `options.fullScreen` | boolean | false | 画面全体に描画 |
| `options.tagId` | string | null | 描画先のエレメントID |
| `options.bgColor` | string | "transparent" | 背景色 (16進数) |

### Example

```json
{
    "width": 240,
    "height": 240,
    "fps": 60,
    "options": {
        "fullScreen": true
    }
}
```

---

## config.json

環境別の設定ファイル。`local`, `dev`, `stg`, `prd`, `all` に分離。

### Structure

```json
{
    "local": { "api": { "endPoint": "/" }, "content": { "endPoint": "/" } },
    "dev":   { "api": { "endPoint": "/" }, "content": { "endPoint": "/" } },
    "stg":   { "api": { "endPoint": "/" }, "content": { "endPoint": "/" } },
    "prd":   { "api": { "endPoint": "https://..." }, "content": { "endPoint": "https://..." } },
    "all":   { /* 全環境共通 */ }
}
```

### `all` Properties (全環境共通)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `defaultTop` | string | "top" | ページトップのView名 |
| `spa` | boolean | true | SPA (URLでシーン制御) |
| `loading.callback` | string | "Loading" | ローディング画面のコールバッククラス。start/end関数が呼ばれる |
| `gotoView.callback` | string/array | ["callback.Background"] | 画面遷移完了後のコールバッククラス。execute関数がasync/awaitで呼ばれる |

### `platform` Property

ビルド時の`--platform`値がセットされる。値: `macos`, `windows`, `linux`, `ios`, `android`, `web`

### Config Access in Code

```typescript
import { config } from "@/config/Config";

const endpoint = config.api.endPoint;
const stageWidth = config.stage.width;
```

---

## routing.json

ルーティング設定。トッププロパティは英数字・スラッシュ。スラッシュをキーにCamelCaseでViewクラスにアクセス。

### Routing Example

```json
{
    "quest/list": {
        "requests": []
    }
}
```

→ `https://example.com/quest/list` でアクセス可能。`QuestListView`クラスがセットされる。

### Cluster Pattern (共通リクエストの再利用)

`@`プレフィックスで共通リクエスト群を定義し、他のルートから参照:

```json
{
    "@sample": {
        "requests": [
            {
                "type": "content",
                "path": "{{ content.endPoint }}content/sample.json",
                "name": "MainContent",
                "cache": true
            }
        ]
    },
    "top": {
        "requests": [
            { "type": "cluster", "path": "@sample" },
            { "type": "json", "path": "{{ api.endPoint }}api/top.json", "name": "TopText" }
        ]
    }
}
```

### Second Level Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `private` | boolean | false | true時、URLアクセスするとTopViewが読み込まれる |
| `requests` | array | null | Viewバインド前に実行するリクエスト群 |

### Request Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | string | "content" | `json`, `content`, `custom`, `cluster` |
| `path` | string | "" | `{{***}}`でconfig変数を参照可能。`@`プレフィックスでcluster参照 |
| `name` | string | "" | responseのキー名。`app.getResponse().get("key")` |
| `cache` | boolean | false | キャッシュ有効。`app.getCache().get("key")` |
| `callback` | string/array | null | リクエスト完了後のコールバッククラス。execute関数が呼ばれる |
| `class` | string | "" | custom type時のリクエスト実行クラス |
| `access` | string | "public" | custom type時の関数アクセス (`public`/`static`) |
| `method` | string | "" | custom type時の関数名 |

### Request Types

- **`json`**: URLからJSONを取得
- **`content`**: Animation Toolコンテンツを取得
- **`custom`**: 指定クラスのメソッドを実行
- **`cluster`**: `@`プレフィックスの共通リクエスト群を参照

### Data Access

```typescript
// responseデータ (画面遷移で初期化される)
const data = app.getResponse().get("HomeText");

// cacheデータ (画面遷移しても保持される)
const cached = app.getCache().get("MainContent");
```

---

## Static Files

### mock/ Directory

ローカル開発用モックデータ。`http://localhost:5173/***`でアクセス可能。`routing.json`のパスと重複しないよう注意。

```
mock/
├── api/          # APIモック (JSON)
├── content/      # Animation Toolコンテンツモック
└── img/          # 画像モック
```

### file/ Directory

Animation Toolで作成した`.n2d`ファイルを格納。バージョン管理可能。

### assets/ Directory

ビルド時にバンドルに含める静的アセット。

```typescript
// 画像インポート
import logoImage from "@/assets/logo.png?inline";

// JSONインポート
import animation from "@/assets/animation.json";
```

| 項目 | assets | mock |
|------|--------|------|
| 用途 | バンドルに含める | 開発サーバーで配信 |
| アクセス | importで取得 | URL経由でfetch |
| ビルド | バンドルに含まれる | 含まれない |

---

## @types/ Directory

グローバルな型定義ファイル (.d.ts)。`Window`インターフェースの拡張等。アプリケーション固有のインターフェースは`src/interface/`に配置。
