# Molecule Components

複数のAtomを組み合わせた複合コンポーネントを格納するディレクトリです。アトミックデザインにおける「分子」に相当します。

Directory for composite components combining multiple Atoms. Corresponds to "Molecules" in Atomic Design.

## 概要 / Overview

Moleculeは、複数のAtomを組み合わせて、より具体的な機能を持つコンポーネントです。画面固有のボタンやフォームなどがここに含まれます。

Molecules are components with more specific functionality by combining multiple Atoms. Screen-specific buttons, forms, etc. are included here.

## コンポーネント一覧 / Component List

### HomeBtnMolecule.ts

Home画面用のボタンコンポーネントです。ドラッグ&ドロップ機能を提供します。

Button component for the Home screen. Provides drag and drop functionality.

```typescript
import { ButtonAtom } from "../atom/ButtonAtom";
import type { IDraggable } from "@/interface/IDraggable";
import { HomeContent } from "@/ui/content/HomeContent";

export class HomeBtnMolecule extends ButtonAtom implements IDraggable {
    private readonly homeContent: HomeContent;

    constructor() {
        super();
        this.homeContent = new HomeContent();
        this.addChild(this.homeContent);
    }

    startDrag(): void {
        // ドラッグ開始処理
    }

    stopDrag(): void {
        // ドラッグ停止処理
    }
}
```

**特徴 / Features:**
- `ButtonAtom` を継承
- `IDraggable` インターフェースを実装
- `HomeContent` (Animation Toolコンテンツ) を含む
- ドラッグ&ドロップ機能を提供

### TopBtnMolecule.ts

Top画面用のボタンコンポーネントです。入場アニメーション機能を提供します。

Button component for the Top screen. Provides entrance animation functionality.

```typescript
import { ButtonAtom } from "../atom/ButtonAtom";
import { TextAtom } from "../atom/TextAtom";

export class TopBtnMolecule extends ButtonAtom {
    constructor(text: string) {
        super();
        
        // ViewModelから渡されたテキストを表示
        const textField = new TextAtom(text, { autoSize: "center" });
        this.addChild(textField);
    }

    playEntrance(callback: () => void): void {
        // 入場アニメーションを再生
    }
}
```

**特徴 / Features:**
- `ButtonAtom` を継承
- テキストはViewModelから引数で受け取る（データ取得はViewModelの責務）
- 入場アニメーション機能を提供
- `TextAtom` を子要素として持つ

## 設計原則 / Design Principles

### 1. Atomの組み合わせ / Combining Atoms

MoleculeはAtomを組み合わせて構成します。

Molecules are composed by combining Atoms.

```typescript
// ✅ 良い例: Atomを組み合わせる
export class TopBtnMolecule extends ButtonAtom {
    constructor(text: string) {
        super();
        const textField = new TextAtom(text);  // TextAtomを使用
        this.addChild(textField);
    }
}
```

### 2. 画面固有の機能 / Screen-specific Functionality

Moleculeは特定の画面の要件に合わせた機能を実装します。

Molecules implement functionality tailored to specific screen requirements.

```typescript
// ✅ 良い例: Home画面用のドラッグ機能
export class HomeBtnMolecule extends ButtonAtom implements IDraggable {
    startDrag(): void { ... }
    stopDrag(): void { ... }
}

// ✅ 良い例: Top画面用のアニメーション
export class TopBtnMolecule extends ButtonAtom {
    playEntrance(callback: () => void): void { ... }
}
```

### 3. データの受け取り / Receiving Data

Moleculeはデータを自ら取得せず、ViewModelから引数として受け取ります。

Molecules don't fetch data themselves; they receive it as arguments from ViewModel.

```typescript
// ✅ 良い例: 引数でデータを受け取る
export class TopBtnMolecule extends ButtonAtom {
    constructor(text: string) {  // ViewModelから受け取る
        super();
        this.textField = new TextAtom(text);
    }
}

// ❌ 悪い例: 直接データ取得
export class TopBtnMolecule extends ButtonAtom {
    async constructor() {
        const data = await Repository.get();  // NG
    }
}
```

### 4. インターフェース実装 / Interface Implementation

ビジネスロジック層との連携のためにインターフェースを実装します。

Implement interfaces for integration with the business logic layer.

```typescript
import type { IDraggable } from "@/interface/IDraggable";

export class HomeBtnMolecule extends ButtonAtom implements IDraggable {
    startDrag(): void { ... }
    stopDrag(): void { ... }
}
```

## 新しいMoleculeの追加方法 / Adding New Molecules

### 手順 / Steps

1. 適切なAtomを継承（通常は `ButtonAtom`）
2. 必要なAtomを子要素として追加
3. 画面固有の機能を実装
4. 必要に応じてインターフェースを実装
5. JSDocコメントを追加

### テンプレート / Template

```typescript
import { ButtonAtom } from "../atom/ButtonAtom";
import { TextAtom } from "../atom/TextAtom";
import type { IYourInterface } from "@/interface/IYourInterface";

/**
 * @description [コンポーネントの説明]
 *              [Component description]
 *
 * @class
 * @extends {ButtonAtom}
 * @implements {IYourInterface}
 */
export class YourMolecule extends ButtonAtom implements IYourInterface
{
    /**
     * @description コンストラクタ
     *              Constructor
     *
     * @param  {string} text - 表示テキスト / Display text
     * @constructor
     * @public
     */
    constructor (text: string)
    {
        super();
        
        // Atomを追加
        const textField = new TextAtom(text);
        this.addChild(textField);
    }

    /**
     * @description [メソッドの説明]
     *              [Method description]
     *
     * @return {void}
     * @method
     * @public
     */
    yourMethod (): void
    {
        // 実装
    }
}
```

## ベストプラクティス / Best Practices

1. **Atom優先** - 可能な限りAtomを再利用
2. **データ注入** - コンストラクタでデータを受け取る
3. **インターフェース** - ビジネスロジックとの連携に使用
4. **単一画面** - 1つのMoleculeは通常1つの画面で使用
5. **命名規則** - `{Screen}Btn/Form/ListMolecule` など明確に

## 関連ドキュメント / Related Documentation

- [../atom/README.md](../atom/README.md) - Atomコンポーネント
- [../README.md](../README.md) - コンポーネント全体の説明
- [../../animation/README.md](../../animation/README.md) - アニメーション定義
- [../../content/README.md](../../content/README.md) - Animation Toolコンテンツ
- [../../../interface/README.md](../../../interface/README.md) - インターフェース定義
