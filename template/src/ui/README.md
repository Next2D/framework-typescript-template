# UI Components

UIコンポーネントを格納するディレクトリです。アトミックデザインの概念に基づいて構成されています。

Directory for storing UI components, structured based on Atomic Design principles.

## ディレクトリ構造 / Directory Structure

```
ui/
├── animation/                 # アニメーション定義
├── component/
│   ├── atom/                  # 最小単位
│   ├── molecule/              # 複合コンポーネント
│   ├── organism/              # 複数Moleculeの組み合わせ（将来の拡張用）
│   ├── page/                  # ページコンポーネント
│   └── template/              # ページテンプレート（将来の拡張用）
└── content/                   # Animation Tool
```

## アトミックデザインの階層 / Atomic Design Hierarchy

### 1. Atom (原子) - 最小単位のコンポーネント

最も基本的なUI要素です。これ以上分割できない最小のコンポーネントです。

The most basic UI elements. The smallest components that cannot be divided further.

#### component/atom/ButtonAtom.ts
ボタンの基本機能を提供します。

Provides basic button functionality.

```typescript
export class ButtonAtom extends Sprite {
    constructor() {
        super();
        this.buttonMode = true;  // ボタンモード有効化
    }
}
```

**特徴 / Features:**
- マウスカーソルがポインター型に変更される
- ボタンとしての基本的な振る舞い

#### component/atom/TextAtom.ts
テキスト表示の基本機能を提供します。

Provides basic text display functionality.

```typescript
export class TextAtom extends TextField implements ITextField {
    constructor(
        text: string = "",
        props: any | null = null,
        format_object: ITextFormatObject | null = null
    ) {
        // プロパティ設定、フォーマット設定
    }
}
```

**特徴 / Features:**
- 柔軟なテキストフォーマット設定
- プロパティの動的設定
- `ITextField` インターフェースを実装

### 2. Molecule (分子) - Atomを組み合わせたコンポーネント

複数のAtomを組み合わせて、より複雑な機能を持つコンポーネントです。

Components with more complex functionality, combining multiple Atoms.

#### component/molecule/HomeBtnMolecule.ts
Home画面のボタンコンポーネントです。

Button component for the Home screen.

```typescript
export class HomeBtnMolecule extends ButtonAtom implements IDraggable {
    private readonly homeContent: HomeContent;

    constructor() {
        super();
        this.homeContent = new HomeContent();
        this.addChild(this.homeContent);
    }
    // IDraggableメソッド(startDrag/stopDrag)はMovieClipContentの親クラスから継承
}
```

**特徴 / Features:**
- `ButtonAtom` を継承
- `IDraggable` インターフェースを実装（メソッドは`MovieClipContent`親クラスから継承）
- ドラッグ&ドロップ機能を提供

#### component/molecule/TopBtnMolecule.ts
Top画面のボタンコンポーネントです。

Button component for the Top screen.

```typescript
export class TopBtnMolecule extends ButtonAtom {
    constructor(text: string) {
        super();
        // ViewModelから渡されたテキストを表示
        const textField = new TextAtom(text, { autoSize: "center" });
        this.addChild(textField);
    }

    playEntrance(callback: () => void): void {
        // アニメーション再生
    }
}
```

**特徴 / Features:**
- テキストはViewModelから引数で受け取る（データ取得はViewModelの責務）
- 入場アニメーション機能

### 3. Content - Animation Tool生成コンテンツ

Animation Toolで作成されたコンテンツです。

Content created with the Animation Tool.

#### content/HomeContent.ts
Home画面用のアニメーションコンテンツです。

Animation content for the Home screen.

```typescript
export class HomeContent extends MovieClipContent implements IDraggable {
    get namespace(): string {
        return "HomeContent";  // Animation Toolのシンボル名
    }
}
```

**特徴 / Features:**
- `MovieClipContent` を継承
- `IDraggable` インターフェースを実装
- Animation Tool (`file/sample.n2d`) と連携

#### content/TopContent.ts
Top画面用のアニメーションコンテンツです。

Animation content for the Top screen.

```typescript
export class TopContent extends MovieClipContent {
    get namespace(): string {
        return "TopContent";
    }
}
```

### 4. Animation - アニメーション定義

コンポーネントのアニメーションロジックを定義します。

Defines animation logic for components.

#### animation/top/TopBtnEntranceAnimation.ts
Topボタンの入場アニメーションです。

Entrance animation for the Top button.

**特徴 / Features:**
- コンポーネントとアニメーションロジックを分離
- 再利用可能なアニメーション定義

## 設計原則 / Design Principles

### 1. 単一責任の原則 / Single Responsibility Principle

各コンポーネントは1つの責務のみを持ちます。

Each component has only one responsibility.

```typescript
// ✅ 良い例: 表示のみを担当
export class TextAtom extends TextField { ... }

// ❌ 悪い例: 表示とビジネスロジックを混在
export class TextAtom extends TextField {
    fetchDataFromAPI() { ... }  // NG: データ取得は別層の責務
}
```

### 2. インターフェース指向 / Interface-Oriented

抽象に依存し、具象に依存しません。

Depend on abstractions, not concretions.

```typescript
// ✅ 良い例: インターフェースを実装し、内部のContentに委譲
export class HomeBtnMolecule extends ButtonAtom implements IDraggable {
    private readonly homeContent: HomeContent;
    // IDraggableメソッド(startDrag/stopDrag)はMovieClipContentの親クラスから継承
}
```

### 3. 再利用性 / Reusability

Atomは汎用的に、Moleculeは特定の用途に設計します。

Atoms are designed generically, Molecules for specific purposes.

```typescript
// Atom: 汎用的
export class ButtonAtom extends Sprite { ... }

// Molecule: 特定の用途
export class HomeBtnMolecule extends ButtonAtom { ... }
export class TopBtnMolecule extends ButtonAtom { ... }
```

### 4. 疎結合 / Loose Coupling

ビジネスロジックやデータアクセスに直接依存しません。

Don't directly depend on business logic or data access.

```typescript
// ✅ 良い例: ViewModelからデータを受け取る
constructor(text: string) {
    this.textField = new TextAtom(text);
}

// ❌ 悪い例: 直接APIアクセス
constructor() {
    const data = await Repository.get();  // NG
}
```

## コンポーネントの作成ガイドライン / Component Creation Guidelines

### Atomの作成 / Creating Atoms

1. **基本クラスを継承** - `Sprite`, `TextField` など
2. **最小限の機能** - 1つの明確な役割
3. **プロパティの設定** - コンストラクタで柔軟に設定可能に
4. **インターフェース実装** - 必要に応じて抽象化

```typescript
import { Sprite } from "@next2d/display";

export class YourAtom extends Sprite {
    constructor(props: any = null) {
        super();
        
        // プロパティ設定
        if (props) {
            Object.assign(this, props);
        }
    }
}
```

### Moleculeの作成 / Creating Molecules

1. **Atomを組み合わせる** - 複数のAtomを子要素として追加
2. **特定の用途** - 画面固有の機能を実装
3. **インターフェース実装** - ビジネスロジック層との連携
4. **イベント処理** - 必要に応じてイベントリスナーを設定

```typescript
import { ButtonAtom } from "../atom/ButtonAtom";
import { TextAtom } from "../atom/TextAtom";

export class YourMolecule extends ButtonAtom {
    constructor() {
        super();
        
        const text = new TextAtom("Click me");
        this.addChild(text);
    }
}
```

### Contentの作成 / Creating Contents

1. **Animation Toolと連携** - `namespace` でシンボル名を指定
2. **MovieClipContentを継承** - フレームアニメーション機能
3. **インターフェース実装** - 必要に応じて機能を追加

```typescript
import { MovieClipContent } from "@next2d/framework";

export class YourContent extends MovieClipContent {
    get namespace(): string {
        return "YourSymbolName";  // Animation Toolのシンボル名
    }
}
```

## テスト / Testing

UIコンポーネントのテストはインターフェースを利用します。

UI component testing utilizes interfaces.

```typescript
import { IDraggable } from "@/interface/IDraggable";

describe('HomeBtnMolecule', () => {
    test('implements IDraggable', () => {
        const btn = new HomeBtnMolecule();
        
        expect(btn.startDrag).toBeDefined();
        expect(btn.stopDrag).toBeDefined();
    });
});
```

## 関連ドキュメント / Related Documentation

- [ARCHITECTURE.md](../../ARCHITECTURE.md) - アーキテクチャ全体の説明
- [interface/README.md](../interface/README.md) - インターフェース定義
- [view/README.md](../view/README.md) - View層の説明
- [Animation Tool Documentation](https://next2d.app/docs/animation-tool/) - Animation Toolの使い方
