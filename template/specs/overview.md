# Next2D Framework TypeScript Template - Overview

## Project Summary

Next2D Frameworkを使用したTypeScriptプロジェクトテンプレート。MVVM + Clean Architecture + Atomic Designを採用。

- **レンダリングエンジン**: Next2D Player
- **フレームワーク**: Next2D Framework
- **言語**: TypeScript
- **ビルドツール**: Vite
- **テスト**: Vitest
- **パッケージマネージャ**: npm

## Requirements

- Node.js 22.x以上
- npm 10.x以上
- iOS: Xcode 14以上 (iOS/Androidビルド時のみ)
- Android: Android Studio, JDK 21以上 (iOS/Androidビルド時のみ)

## Architecture

**MVVM + Clean Architecture + Atomic Design** の5層構成:

```
View Layer (view/, ui/)
  └─ depends on ─→ Interface Layer (interface/)
                     ↑
Application Layer (model/application/)
  ├─ depends on ─→ Interface Layer
  ├─ depends on ─→ Domain Layer (model/domain/)
  └─ calls ──────→ Infrastructure Layer (model/infrastructure/)
```

### Layer Dependencies (依存関係の方向)

- **View層** → Interface経由でApplication層を使用
- **Application層** → Interface経由でDomain層・Infrastructure層を使用
- **Domain層** → 何にも依存しない（最も安定、純粋なビジネスロジック）
- **Infrastructure層** → Interface層を実装

### Key Design Patterns

1. **MVVM**: View(表示) / ViewModel(橋渡し) / Model(ビジネスロジック+データアクセス)
2. **UseCase Pattern**: ユーザーアクションごとに専用のUseCaseクラスを作成
3. **Dependency Inversion**: 具象クラスではなくインターフェースに依存
4. **Repository Pattern**: データアクセスを抽象化
5. **Atomic Design**: Atom → Molecule → Organism → Template → Page

## Directory Structure

```
src/
├── config/                    # 設定ファイル (stage.json, config.json, routing.json)
├── interface/                 # TypeScriptインターフェース定義
├── model/
│   ├── application/           # UseCase (ビジネスロジック実装)
│   │   └── {screen}/usecase/
│   ├── domain/                # コアビジネスロジック
│   │   └── {feature}/service/
│   └── infrastructure/        # Repository (データアクセス)
│       └── repository/
├── ui/
│   ├── animation/             # アニメーション定義
│   │   └── {screen}/
│   ├── component/
│   │   ├── atom/              # 最小コンポーネント (Button, Text等)
│   │   ├── molecule/          # 複合コンポーネント
│   │   ├── organism/          # 複数Moleculeの組み合わせ (拡張用)
│   │   ├── page/              # ページコンポーネント
│   │   │   └── {screen}/
│   │   └── template/          # ページテンプレート (拡張用)
│   └── content/               # Animation Tool生成コンテンツ
├── view/                      # View & ViewModel
│   └── {screen}/
│       ├── {Screen}View.ts
│       └── {Screen}ViewModel.ts
└── assets/                    # 静的ファイル (画像, JSON)

@types/                        # グローバル型定義 (.d.ts)
electron/                      # Electron設定 (デスクトップビルド用)
file/                          # Animation Tool n2dファイル
mock/                          # 開発用モックデータ (API, Content, 画像)
```

## Best Practices (全体共通)

1. **インターフェース優先**: 常に具象クラスではなくインターフェースに依存
2. **単一責任の原則**: 各クラスは1つの責務のみを持つ
3. **型安全性**: `any`型を避け、明示的な型定義を使用
4. **テスタブル**: 各層を独立してテスト可能にする
5. **JSDoc**: 処理内容を日英両方で明記
6. **executeメソッド**: UseCaseのエントリーポイントを統一
7. **エラーハンドリング**: Infrastructure層で適切に処理
