# UI Layer (Components / Animation / Content)

## Directory Structure

```
ui/
├── animation/           # アニメーション定義
│   └── {screen}/
│       └── {Component}{Action}Animation.ts
├── component/
│   ├── atom/            # 最小単位 (Button, Text等)
│   ├── molecule/        # Atomの組み合わせ
│   ├── organism/        # 複数Moleculeの組み合わせ (拡張用)
│   ├── page/            # ページコンポーネント
│   │   └── {screen}/
│   └── template/        # ページテンプレート (拡張用)
└── content/             # Animation Tool生成コンテンツ
```

## Rules (共通)

- 各コンポーネントは単一の責務のみ
- ビジネスロジックやデータアクセスに直接依存しない
- データはViewModelから引数で受け取る
- インターフェースを実装して抽象化する

---

## Atomic Design Hierarchy

### Atom (原子) - 最小単位

最も基本的なUI要素。これ以上分割できない。

```typescript
// ButtonAtom: ボタンの基本機能
import { Sprite } from "@next2d/display";

export class ButtonAtom extends Sprite
{
    constructor ()
    {
        super();
        this.buttonMode = true;
    }
}
```

```typescript
// TextAtom: テキスト表示の基本機能
import { TextField } from "@next2d/text";
import type { ITextField } from "@/interface/ITextField";
import type { ITextFormatObject } from "@/interface/ITextFormatObject";

export class TextAtom extends TextField implements ITextField
{
    constructor (
        text: string = "",
        props: any | null = null,
        format_object: ITextFormatObject | null = null
    ) {
        super();
        // プロパティ設定、フォーマット設定
    }
}
```

### Molecule (分子) - Atomの組み合わせ

複数のAtomを組み合わせた、特定の用途向けコンポーネント。

```typescript
import { ButtonAtom } from "../atom/ButtonAtom";
import { HomeContent } from "@/ui/content/HomeContent";
import type { IDraggable } from "@/interface/IDraggable";

export class HomeBtnMolecule extends ButtonAtom implements IDraggable
{
    private readonly homeContent: HomeContent;

    constructor ()
    {
        super();
        this.homeContent = new HomeContent();
        this.addChild(this.homeContent);
    }

    // IDraggableメソッド(startDrag/stopDrag)はMovieClipContentの親クラスから継承
}
```

```typescript
import { ButtonAtom } from "../atom/ButtonAtom";
import { TextAtom } from "../atom/TextAtom";

export class TopBtnMolecule extends ButtonAtom
{
    constructor (text: string) // ViewModelからテキストを受け取る
    {
        super();
        const textField = new TextAtom(text, { autoSize: "center" });
        this.addChild(textField);
    }

    playEntrance (callback: () => void): void
    {
        // アニメーション再生
    }
}
```

### Organism (有機体) - 拡張用

複数のMoleculeを組み合わせた大きな機能単位。必要に応じて実装。

### Page (ページ)

画面全体を構成するコンポーネント。ViewからPageを配置し、PageがMolecule/Atomを組み合わせて画面構築。

### Template (テンプレート) - 拡張用

ページのレイアウト構造を定義。必要に応じて実装。

## Component Creation Templates

### New Atom

```typescript
import { Sprite } from "@next2d/display";

export class YourAtom extends Sprite
{
    constructor (props: any = null)
    {
        super();
        if (props) {
            Object.assign(this, props);
        }
    }
}
```

### New Molecule

```typescript
import { ButtonAtom } from "../atom/ButtonAtom";
import { TextAtom } from "../atom/TextAtom";

export class YourMolecule extends ButtonAtom
{
    constructor ()
    {
        super();
        const text = new TextAtom("Click me");
        this.addChild(text);
    }
}
```

## Anti-Patterns

```typescript
// NG: コンポーネント内でデータ取得
export class BadAtom extends TextField {
    async fetchDataFromAPI() { ... } // NG: データ取得は別層の責務
}

// NG: 直接APIアクセス
constructor() {
    const data = await Repository.get(); // NG
}

// OK: ViewModelからデータを受け取る
constructor(text: string) {
    this.textField = new TextAtom(text); // OK
}
```

---

## Animation

アニメーションロジックをコンポーネントから分離し、再利用性と保守性を向上。

### Naming Convention

`{Component}{Action}Animation.ts` (例: `TopBtnShowAnimation.ts`)

### Animation Types

- **Show Animation**: 画面表示時のアニメーション
- **Exit Animation**: 画面遷移時のアニメーション
- **Interaction Animation**: ユーザー操作に対するアニメーション

### Animation Class Template

```typescript
import type { Sprite } from "@next2d/display";
import { Tween, Easing, type Job } from "@next2d/ui";
import { Event } from "@next2d/events";

/**
 * @description [アニメーションの説明]
 *              [Animation description]
 *
 * @class
 * @public
 */
export class YourAnimation
{
    private readonly _job: Job;

    /**
     * @param {Sprite} sprite - アニメーション対象
     * @param {() => void} callback - 完了時コールバック
     * @constructor
     * @public
     */
    constructor (
        sprite: Sprite,
        callback?: () => void
    ) {
        // 初期状態設定
        sprite.alpha = 0;

        // Tween設定: (対象, 開始値, 終了値, 秒数, 遅延秒数, イージング)
        this._job = Tween.add(sprite,
            { "alpha": 0 },
            { "alpha": 1 },
            0.5, 1, Easing.outQuad
        );

        if (callback) {
            this._job.addEventListener(Event.COMPLETE, callback);
        }
    }

    /**
     * @description アニメーション開始
     *              Start animation
     *
     * @method
     * @public
     */
    start (): void
    {
        this._job.start();
    }
}
```

### Component-Animation Coordination

```typescript
// component/molecule/TopBtnMolecule.ts
import { TopBtnShowAnimation } from "@/ui/animation/top/TopBtnShowAnimation";

export class TopBtnMolecule extends ButtonAtom {
    playShow(callback: () => void): void {
        new TopBtnShowAnimation(this, callback).start();
    }
}
```

---

## Content (Animation Tool)

Animation Toolで作成されたコンテンツをTypeScriptクラスとしてラップ。

### Content Template

```typescript
import { MovieClipContent } from "@next2d/framework";

/**
 * @description [コンテンツの説明]
 *              [Content description]
 *
 * @class
 * @extends {MovieClipContent}
 */
export class YourContent extends MovieClipContent
{
    /**
     * @description Animation Toolのシンボル名を返す
     *              Returns the Animation Tool symbol name
     *
     * @return {string}
     * @readonly
     */
    get namespace (): string
    {
        return "YourSymbolName"; // Animation Toolで設定した名前と一致させる
    }
}
```

### Content with Interface

```typescript
import { MovieClipContent } from "@next2d/framework";
import type { IDraggable } from "@/interface/IDraggable";

export class HomeContent extends MovieClipContent implements IDraggable
{
    get namespace (): string
    {
        return "HomeContent";
    }

    // IDraggableメソッド(startDrag/stopDrag)は
    // MovieClipContentの親クラス(MovieClip)から継承
}
```

### Content Creation Steps

1. Animation Toolでシンボルを作成
2. `.n2d`ファイルを`file/`ディレクトリに配置
3. Contentクラスを作成 (`namespace`はシンボル名と一致させる)
4. Molecule等のコンポーネントで使用

### Content Rules

- クラス名とシンボル名を一致させる
- アニメーションの制御のみを担当
- 必要な機能はインターフェースで定義
