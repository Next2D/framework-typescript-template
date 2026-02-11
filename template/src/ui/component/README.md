# UI Components

アトミックデザインに基づいたUIコンポーネントを格納するディレクトリです。

Directory for UI components based on Atomic Design principles.

## ディレクトリ構造 / Directory Structure

```
component/
├── atom/                      # 最小単位
│   ├── ButtonAtom.ts
│   └── TextAtom.ts
├── molecule/                  # 複合コンポーネント
│   ├── HomeBtnMolecule.ts
│   └── TopBtnMolecule.ts
├── organism/                  # 複数Moleculeの組み合わせ（将来の拡張用）
├── page/                      # ページコンポーネント
│   ├── home/
│   │   └── HomePage.ts
│   └── top/
│       └── TopPage.ts
└── template/                  # ページテンプレート（将来の拡張用）
```

## アトミックデザイン階層 / Atomic Design Hierarchy

### Atom (原子)

最も基本的なUI要素です。これ以上分割できない最小のコンポーネントです。

The most basic UI elements. The smallest components that cannot be divided further.

- `ButtonAtom` - ボタンの基本機能を提供
- `TextAtom` - テキスト表示の基本機能を提供

### Molecule (分子)

複数のAtomを組み合わせて、より複雑な機能を持つコンポーネントです。

Components with more complex functionality, combining multiple Atoms.

- `HomeBtnMolecule` - Home画面用のボタン（ドラッグ機能付き、`IDraggable`は内部の`HomeContent`経由で提供）
- `TopBtnMolecule` - Top画面用のボタン（アニメーション付き）

### Organism (有機体) - 将来の拡張用

複数のMoleculeを組み合わせた、より大きな機能単位のコンポーネントです。現在は`.gitkeep`のみで、必要に応じて実装します。

Larger functional unit components combining multiple Molecules. Currently contains only `.gitkeep`, to be implemented as needed.

### Template (テンプレート) - 将来の拡張用

ページのレイアウト構造を定義するテンプレートです。現在は`.gitkeep`のみで、必要に応じて実装します。

Templates that define page layout structures. Currently contains only `.gitkeep`, to be implemented as needed.

### Page (ページ)

画面全体を構成するコンポーネントです。ViewからPageを配置し、PageがMoleculeやAtomを組み合わせて画面を構築します。

Components that compose entire screens. Views place Pages, and Pages combine Molecules and Atoms to build screens.

- `HomePage` - Home画面のページコンポーネント
- `TopPage` - Top画面のページコンポーネント

## 設計原則 / Design Principles

### 1. 単一責任の原則 / Single Responsibility

各コンポーネントは1つの責務のみを持ちます。

Each component has only one responsibility.

```typescript
// ✅ 良い例: 表示のみを担当
export class TextAtom extends TextField { ... }

// ❌ 悪い例: データ取得とUIを混在
export class TextAtom extends TextField {
    fetchData() { ... }  // NG
}
```

### 2. インターフェース指向 / Interface-Oriented

抽象に依存し、具象に依存しません。

Depend on abstractions, not concretions.

```typescript
// ✅ 良い例: IDraggableを実装し、内部のContentに委譲
export class HomeBtnMolecule extends ButtonAtom implements IDraggable {
    private readonly homeContent: HomeContent;
    // IDraggableメソッドはMovieClipContent(HomeContent)の親クラスから継承
}
```

### 3. 再利用性 / Reusability

- **Atom** - 汎用的に設計
- **Molecule** - 特定の用途に設計

## 新しいコンポーネントの追加 / Adding New Components

### Atomの追加

```typescript
// src/ui/component/atom/YourAtom.ts
import { Sprite } from "@next2d/display";

export class YourAtom extends Sprite {
    constructor() {
        super();
    }
}
```

### Moleculeの追加

```typescript
// src/ui/component/molecule/YourMolecule.ts
import { ButtonAtom } from "../atom/ButtonAtom";

export class YourMolecule extends ButtonAtom {
    constructor() {
        super();
    }
}
```

## 関連ドキュメント / Related Documentation

- [atom/README.md](./atom/README.md) - Atomコンポーネント
- [molecule/README.md](./molecule/README.md) - Moleculeコンポーネント
- [../README.md](../README.md) - UI全体の説明
- [../../interface/README.md](../../interface/README.md) - インターフェース定義
