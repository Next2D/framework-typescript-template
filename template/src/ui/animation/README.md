# Animation Definitions

コンポーネントのアニメーションロジックを格納するディレクトリです。

Directory for storing animation logic for components.

## 概要 / Overview

アニメーション定義をコンポーネントから分離することで、コードの再利用性と保守性を向上させます。

Separating animation definitions from components improves code reusability and maintainability.

## ディレクトリ構造 / Directory Structure

```
animation/
└── top/
    └── TopBtnShowAnimation.ts
```

画面ごとにサブディレクトリを作成し、その中にアニメーション定義ファイルを配置します。

Create subdirectories for each screen and place animation definition files within them.

## アニメーションの種類 / Animation Types

### 登場アニメーション / Show Animation

画面表示時のアニメーションです。

Animation when the screen is displayed.

### 退場アニメーション / Exit Animation

画面遷移時のアニメーションです。

Animation during screen transitions.

### インタラクションアニメーション / Interaction Animation

ユーザー操作に対するアニメーションです。

Animation in response to user actions.

## 実装例 / Implementation Example

### TopBtnShowAnimation.ts

```typescript
import type { TopBtnMolecule } from "@/ui/component/molecule/TopBtnMolecule";
import { Tween, Easing, type Job } from "@next2d/ui";
import { Event } from "@next2d/events";

/**
 * @description Topボタンの登場アニメーション
 *              Top Button Entrance Animation
 *
 * @class
 * @public
 */
export class TopBtnShowAnimation {

    private readonly _job: Job;

    /**
     * @param {TopBtnMolecule} sprite
     * @param {() => void} callback
     * @constructor
     * @public
     */
    constructor(
        sprite: TopBtnMolecule,
        callback: () => void
    ) {

        // アニメーションの初期値に設定
        sprite.alpha = 0;

        this._job = Tween.add(sprite,
            {
                "alpha": 0
            },
            {
                "alpha": 1
            }, 0.5, 1, Easing.inQuad
        );

        // 終了アニメーションが完了したら、完了イベントを発行
        this._job.addEventListener(Event.COMPLETE, (): void =>
        {
            callback();
        });
    }

    /**
     * @description アニメーション開始
     *              Start animation
     *
     * @method
     * @public
     */
    start(): void {
        this._job.start();
    }
}
```

## 設計原則 / Design Principles

### 1. コンポーネントとの分離 / Separation from Components

アニメーションロジックをコンポーネントから分離します。

Separate animation logic from components.

```typescript
// ✅ 良い例: アニメーションを別ファイルに分離
// animation/top/TopBtnShowAnimation.ts
export class TopBtnShowAnimation { ... }

// component/molecule/TopBtnMolecule.ts
import { TopBtnShowAnimation } from "@/ui/animation/top/TopBtnShowAnimation";

export class TopBtnMolecule extends ButtonAtom {
    playShow(callback: () => void): void {
        new TopBtnShowAnimation(this, callback).start();
    }
}
```

### 2. 再利用性 / Reusability

同じアニメーションを複数のコンポーネントで使用できるようにします。

Make the same animation usable across multiple components.

```typescript
// ✅ 良い例: 汎用的なフェードインアニメーションクラス
import { Tween, Easing, type Job } from "@next2d/ui";
import type { Sprite } from "@next2d/display";
import { Event } from "@next2d/events";

export class FadeInAnimation {
    private readonly _job: Job;

    constructor(target: Sprite, callback?: () => void) {
        target.alpha = 0;
        this._job = Tween.add(target, { "alpha": 0 }, { "alpha": 1 }, 0.3, 1, Easing.linear);
        if (callback) {
            this._job.addEventListener(Event.COMPLETE, callback);
        }
    }

    start(): void {
        this._job.start();
    }
}
```

### 3. コールバック対応 / Callback Support

アニメーション完了時のコールバックをサポートします。

Support callbacks for when animation completes.

```typescript
import { Tween, Easing, type Job } from "@next2d/ui";
import { Event } from "@next2d/events";

export class ExampleAnimation {
    private readonly _job: Job;

    constructor(target: Sprite, callback?: () => void) {
        this._job = Tween.add(target, { "alpha": 0 }, { "alpha": 1 }, 0.5, 1, Easing.outQuad);
        
        if (callback) {
            this._job.addEventListener(Event.COMPLETE, callback);
        }
    }

    start(): void {
        this._job.start();
    }
}
```

## 新しいアニメーションの追加 / Adding New Animations

### 手順 / Steps

1. 対象画面のディレクトリを確認（なければ作成）
2. アニメーション関数を作成
3. コンポーネントから呼び出し
4. JSDocコメントを追加

### テンプレート / Template

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
export class YourAnimation {

    private readonly _job: Job;

    /**
     * @param {Sprite} sprite - アニメーション対象
     * @param {() => void} callback - 完了時コールバック
     * @constructor
     * @public
     */
    constructor(
        sprite: Sprite,
        callback?: () => void
    ) {

        // 初期状態設定
        sprite.alpha = 0;

        // アニメーション設定
        this._job = Tween.add(sprite,
            {
                "alpha": 0
            },
            {
                "alpha": 1
            }, 0.5, 1, Easing.outQuad
        );

        // 完了時コールバック
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
    start(): void {
        this._job.start();
    }
}
```

## ベストプラクティス / Best Practices

1. **分離** - アニメーションロジックをコンポーネントから分離
2. **命名** - `{Component}{Action}Animation.ts` の形式で命名（例: TopBtnShowAnimation.ts）
3. **コールバック** - Event.COMPLETEで完了時の処理をサポート
4. **再利用** - 汎用的なアニメーションクラスは共通化
5. **クラスベース** - Jobインスタンスを保持し、start()メソッドで開始

## 関連ドキュメント / Related Documentation

- [../component/README.md](../component/README.md) - UIコンポーネント
- [../README.md](../README.md) - UI全体の説明
- [Next2D Tween Documentation](https://next2d.app/docs/tween/) - Tweenの使い方
