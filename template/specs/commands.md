# CLI Commands Reference

## Setup

```bash
npm install          # 依存パッケージのインストール
```

## Development

```bash
npm start            # 開発サーバー起動 (http://localhost:5173)
npm run generate     # routing.jsonからView/ViewModelクラスを自動生成
```

## Testing

```bash
npm test                    # 全テスト実行 (Vitest)
npm test -- --watch         # ウォッチモード
npm test -- --coverage      # カバレッジレポート
```

## Build

| Command | Platform | Output |
|---------|----------|--------|
| `npm run build:web -- --env prd` | Web (HTML) | `dist/web/prd/` |
| `npm run build:steam:windows -- --env prd` | Windows (Steam) | `dist/steam/windows/` |
| `npm run build:steam:macos -- --env prd` | macOS (Steam) | `dist/steam/macos/` |
| `npm run build:steam:linux -- --env prd` | Linux (Steam) | `dist/steam/linux/` |
| `npm run build:ios -- --env prd` | iOS | Xcode project |
| `npm run build:android -- --env prd` | Android | Android Studio project |

## Platform Emulators

```bash
npm run preview:windows -- --env prd    # Windows
npm run preview:macos -- --env prd      # macOS
npm run preview:linux -- --env prd      # Linux
npm run preview:ios -- --env prd        # iOS
npm run preview:android -- --env prd    # Android
```

`--env` オプション: `local`, `dev`, `stg`, `prd`

## Environment Configuration

環境ごとの設定は`src/config/config.json`で管理。`--env`で指定した環境名の設定値と`all`の設定値がマージされる。
