# Atom Components

最小単位のUIコンポーネントを格納するディレクトリです。アトミックデザインにおける「原子」に相当します。

Directory for the smallest UI components. Corresponds to "Atoms" in Atomic Design.

## 概要 / Overview

Atomは、これ以上分割できない最も基本的なUI要素です。ボタン、テキストフィールド、アイコンなどの基本パーツがここに含まれます。

Atoms are the most basic UI elements that cannot be divided further. Basic parts such as buttons, text fields, and icons are included here.

## コンポーネント一覧 / Component List

### ButtonAtom.ts

ボタンの基本機能を提供するコンポーネントです。

Component that provides basic button functionality.

```typescript
import { Sprite } from "@next2d/display";

export class ButtonAtom extends Sprite {
    constructor() {
        super();
        this.buttonMode = true;  // マウスカーソルがポインターに変更
    }
}
```

**特徴 / Features:**
- マウスカーソルがポインター型に変更される
- ボタンとしての基本的な振る舞いを提供
- Moleculeコンポーネントの基底クラスとして使用

### TextAtom.ts

テキスト表示の基本機能を提供するコンポーネントです。

Component that provides basic text display functionality.

```typescript
import { TextField } from "@next2d/display";
import type { ITextField } from "@/interface/ITextField";
import type { ITextFormatObject } from "@/interface/ITextFormatObject";

export class TextAtom extends TextField implements ITextField {
    constructor(
        text: string = "",
        props: any | null = null,
        format_object: ITextFormatObject | null = null
    ) {
        super();
        // プロパティ設定とフォーマット適用
    }
}
```

**特徴 / Features:**
- 柔軟なテキストフォーマット設定
- プロパティの動的設定が可能
- `ITextField` インターフェースを実装

## 設計原則 / Design Principles

### 1. 最小限の機能 / Minimal Functionality

Atomは1つの明確な役割のみを持ちます。

Atoms have only one clear role.

```typescript
// ✅ 良い例: ボタンの基本機能のみ
export class ButtonAtom extends Sprite {
    constructor() {
        super();
        this.buttonMode = true;
    }
}

// ❌ 悪い例: 複数の責務
export class ButtonAtom extends Sprite {
    async fetchData() { ... }  // NG: データ取得は別層の責務
    navigate() { ... }         // NG: ナビゲーションは別層の責務
}
```

### 2. 汎用性 / Genericity

特定の画面に依存せず、汎用的に使用できるように設計します。

Design to be used generically without depending on specific screens.

```typescript
// ✅ 良い例: 汎用的なテキストコンポーネント
export class TextAtom extends TextField {
    constructor(text: string, props: any = null) {
        super();
        this.text = text;
    }
}

// ❌ 悪い例: 特定画面に依存
export class HomeTextAtom extends TextField {  // NG: 画面固有
    constructor() {
        super();
        this.text = "Home Screen";  // NG: 固定値
    }
}
```

### 3. インターフェース実装 / Interface Implementation

必要に応じてインターフェースを実装し、型安全性を確保します。

Implement interfaces as needed to ensure type safety.

```typescript
import type { ITextField } from "@/interface/ITextField";

export class TextAtom extends TextField implements ITextField {
    width: number;
    x: number;
}
```

## 新しいAtomの追加方法 / Adding New Atoms

### 手順 / Steps

1. 基本クラスを継承（`Sprite`, `TextField`, `Shape` など）
2. コンストラクタで基本設定を行う
3. 必要に応じてインターフェースを実装
4. JSDocコメントを追加

### テンプレート / Template

```typescript
import { Sprite } from "@next2d/display";

/**
 * @description [コンポーネントの説明]
 *              [Component description]
 *
 * @class
 * @extends {Sprite}
 */
export class YourAtom extends Sprite
{
    /**
     * @description コンストラクタ
     *              Constructor
     *
     * @constructor
     * @public
     */
    constructor ()
    {
        super();
        
        // 初期設定
    }
}
```

## ベストプラクティス / Best Practices

1. **単一責任** - 1つのAtomは1つの責務のみ
2. **汎用性** - 特定の画面やデータに依存しない
3. **再利用性** - 異なるMoleculeから使用可能
4. **インターフェース** - 型安全性のため必要に応じて実装

## 関連ドキュメント / Related Documentation

- [../molecule/README.md](../molecule/README.md) - Moleculeコンポーネント
- [../README.md](../README.md) - コンポーネント全体の説明
- [../../README.md](../../README.md) - UI全体の説明
- [../../../interface/README.md](../../../interface/README.md) - インターフェース定義
