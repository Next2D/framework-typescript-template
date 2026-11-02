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

## Lint / Type Check

```bash
npm run lint         # ESLint
npm run typecheck    # Packages.ts / Config.ts を生成してから tsc --noEmit
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
| `npm run build:web` | Web (HTML) | `dist/web/prd/` |
| `npm run build:steam:windows` | Windows (Steam) | `dist/steam/windows/build/prd/` |
| `npm run build:steam:macos` | macOS (Steam) | `dist/steam/macos/build/prd/` |
| `npm run build:steam:linux` | Linux (Steam) | `dist/steam/linux/build/prd/` |
| `npm run build:steam:manifest` | Steam共有Depot | `dist/steam/shared/prd/` |
| `npm run open:ios` | iOS | 同期してXcodeで開く |
| `npm run open:android` | Android | 同期してAndroid Studioで開く |
| `npm run build:ios` | iOS | 同期・ビルド（Xcodeと署名設定が必要） |
| `npm run build:android` | Android | 同期・ビルド（SDK/JDKと署名設定が必要） |
| `npm run build:xbox` | Xbox（試作） | `xbox/` にGDKホストを生成・ビルド |
| `npm run open:xbox` | Xbox（試作） | CMake構成後にVisual Studioで開く（Windowsのみ） |

全スクリプトの既定環境は `prd`。`npm run build:web -- --env dev` のように `--env` で上書きする。

## iOS / Androidの依存管理

`@capacitor/cli`・`@capacitor/core`・`@capacitor/ios`・`@capacitor/android` はbuilderが管理する。
builderはnpmスクリプトから `npx` で起動し、builder・Capacitorともゲームの直接依存には追加しない。
ゲーム側は `capacitor.config.json`、既存のネイティブプロジェクト、ゲーム固有のプラグインを管理する。
builderは `webDir` を更新してからプロジェクトを生成・同期し、既存のネイティブ設定を維持する。
ゲームのコードから `@capacitor/core` を直接importする場合だけ、互換バージョンの直接依存も宣言する。

## Platform Emulators

```bash
npm run preview:web        # Web
npm run preview:windows    # Windows
npm run preview:macos      # macOS
npm run preview:linux      # Linux
npm run preview:ios        # iOS
npm run preview:android    # Android
```

`--env` オプション: `local`, `dev`, `stg`, `prd`

## Environment Configuration

環境ごとの設定は`src/config/config.json`で管理。`--env`で指定した環境名の設定値と`all`の設定値がマージされる。

## Electron / Steam

- Electron設定はルートの `electron.config.json` に集約。ホストとElectronバージョンはbuilderが管理し、`electron/` は不要。
- Windowsは `x64` が既定、`arm64` も対応。32bit (`ia32`) は非対応。出力名の `win32-x64` は64bit版Windowsを意味する。
- macOSは `universal`、Linuxは `x64` が既定。CPU設定はJSONまたは `--arch` で指定する。
- アイコンは `src/assets/icons/icon.ico` / `icon.icns` / `icon.png` を参照。仮のNext2D画像を製品用に置き換える。
- App ID・Depot IDは未発行なら `null`。複数OSで同一Depot IDを指定可能。
- 共有Depotは全対象OSの成果物が揃うと `dist/steam/shared/<env>/depot-<ID>/` に統合VDFを生成する。
- 別マシンの成果物を集めた場合は `npm run build:steam:manifest` で再ビルドせず統合する。共有Depotへの配置先はOS別サブフォルダ。

```sh
npm run build:steam:windows -- --arch arm64
npm run build:steam:manifest -- --env prd
```

### Steamアップロード

```sh
npm run upload:steam:dry-run   # ローカル検証のみ
npm run upload:steam           # 全OSの成果物を1回でアップロード（STEAM_USERNAME、任意でSTEAMCMDが必要）
```

反映先ブランチは `electron.config.json` の `steam.branch`（既定 `internal`）。`--steam-branch` で上書きできる。

## Xbox（試作）

- GDK設定はルートの `MicrosoftGame.config` で管理する。`TitleId`・`StoreId`・`MSAAppId`・ストアロゴをPartner Centerの値に置き換える。
- `npm run build:xbox` でbuilder同梱テンプレートから `xbox/`（C++/CMakeホスト、git管理外）を生成し、設定を注入する。
- 実行ファイルのビルドはWindows + Visual Studio 2022 + Microsoft GDK + CMake 3.26以上が必要。macOS / Linuxはホスト生成とアセット準備まで。
