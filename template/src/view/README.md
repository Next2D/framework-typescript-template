# View and ViewModel

1画面にViewとViewModelをワンセット作成するのが基本スタイルです。ディレクトリ構成はキャメルケースの最初のブロックで作成するのを推奨しています。

The basic style is to create one set of View and ViewModel per screen. It is recommended that the directory structure be organized using the first segment in camelCase.

## アーキテクチャ / Architecture

このプロジェクトは **MVVM (Model-View-ViewModel)** パターンを採用しています。

This project adopts the **MVVM (Model-View-ViewModel)** pattern.

```
┌─────────────────────────────────────────┐
│              View Layer                  │
│  - 画面の構造と表示を担当                   │
│  - ビジネスロジックは持たない               │
└─────────────────────────────────────────┘
                  ↓ ↑
┌─────────────────────────────────────────┐
│           ViewModel Layer                │
│  - ViewとModelの橋渡し                    │
│  - UseCaseを保持                         │
│  - イベントハンドリング                     │
└─────────────────────────────────────────┘
                  ↓ ↑
           (Interface 経由)
                  ↓ ↑
┌─────────────────────────────────────────┐
│            Model Layer                   │
│  - ビジネスロジック (UseCase)             │
│  - データアクセス (Repository)            │
└─────────────────────────────────────────┘
```

## Example of directory structure

```sh
project
└── src
    └── view
        ├── top
        │   ├── TopView.ts
        │   └── TopViewModel.ts
        └── home
            ├── HomeView.ts
            └── HomeViewModel.ts
```

## Generator

複数のViewクラス、及び、ViewModelクラスを生成する際は、以下のコマンドで自動生成する事をお勧めします。このコマンドは `routing.json` のトッププロパティの値を分解し、`view` ディレクトリ直下に対象のディレクトリがなければディレクトリを作成し、ViewとViewModelが存在しない場合のみ新規でクラスを生成します。

When generating multiple View and ViewModel classes, it is recommended to use the following command for auto-generation. This command parses the top-level property values in `routing.json`, creates the target directories under the `view` directory if they do not exist, and generates new classes only if the corresponding View and ViewModel classes are missing.

```sh
npm run generate
```

## View Class

メインコンテキストにアタッチされるコンテナです。その為、記述は至ってシンプルで、 `routing.json` で設定した値のキャメルケースでファイルを作成し、Viewクラスを継承するのが基本のスタイルです。起動時に `initialize` 関数がコールされます。Viewは表示構造のみを担当し、ビジネスロジックはViewModelに委譲します。

It is a container attached to the main context. Therefore, its implementation is kept very simple: files are created using the camelCase version of the values specified in `routing.json`, and the basic style is to extend the View class. The `initialize` function is called at startup. The View handles only the display structure and delegates business logic to the ViewModel.

### View の責務 / View Responsibilities

- ✅ **画面の構造定義** - UIコンポーネントの配置と座標設定
- ✅ **イベントリスナーの登録** - ViewModelのメソッドと接続
- ✅ **ライフサイクル管理** - `initialize`, `onEnter`, `onExit`
- ❌ **ビジネスロジック** - ViewModelに委譲
- ❌ **データアクセス** - Repositoryに委譲
- ❌ **状態管理** - ViewModelに委譲

### Example of View class source

```typescript
import type { HomeViewModel } from "./HomeViewModel";
import { View } from "@next2d/framework";
import { HomeBtnMolecule } from "@/ui/component/molecule/HomeBtnMolecule";
import { TextAtom } from "@/ui/component/atom/TextAtom";
import { PointerEvent, Event } from "@next2d/events";

/**
 * @class
 * @extends {View}
 */
export class HomeView extends View
{
    /**
     * @param {HomeViewModel} vm
     * @constructor
     * @public
     */
    constructor (
        private readonly vm: HomeViewModel
    ) {
        super();
    }

    /**
     * @description 画面の初期化
     *              Initialize the screen
     *
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async initialize (): Promise<void>
    {
        // UIコンポーネントの作成と配置
        const homeContent = new HomeBtnMolecule();
        homeContent.x = 120;
        homeContent.y = 120;

        // イベントをViewModelに委譲
        homeContent.addEventListener(
            PointerEvent.POINTER_DOWN,
            this.vm.homeContentPointerDownEvent
        );

        this.addChild(homeContent);
    }

    /**
     * @description 画面表示時の処理
     *              Called when screen is shown
     *
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async onEnter (): Promise<void>
    {
        // アニメーション開始などの処理
    }

    /**
     * @description 画面非表示時の処理
     *              Called when screen is hidden
     *
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async onExit (): Promise<void>
    {
        // クリーンアップ処理
    }
}
```

### View のライフサイクル / View Lifecycle

1. **コンストラクタ** - ViewModelをインジェクション
2. **initialize()** - UIコンポーネントの作成と配置
3. **onEnter()** - 画面表示時の処理（アニメーション開始など）
4. **onExit()** - 画面非表示時の処理（クリーンアップなど）

## ViewModel Class

ViewとModelの橋渡しを行います。UseCaseを保持し、Viewからのイベントを処理してビジネスロジックを実行します。ViewModelは依存性注入パターンを使用し、コンストラクタでUseCaseのインスタンスを生成します。

Acts as a bridge between View and Model. Holds UseCases and processes events from View to execute business logic. ViewModel uses the dependency injection pattern, creating UseCase instances in the constructor.

### ViewModel の責務 / ViewModel Responsibilities

- ✅ **イベント処理** - Viewからのイベントを受け取る
- ✅ **UseCaseの実行** - ビジネスロジックを呼び出す
- ✅ **依存性の管理** - UseCaseのインスタンスを保持
- ✅ **状態管理** - 画面固有の状態を管理（必要に応じて）
- ❌ **UI操作** - Viewに委譲
- ❌ **ビジネスロジック** - UseCaseに委譲

### Example of ViewModel class source

```typescript
import type { IDraggable } from "@/interface/IDraggable";
import type { ITextField } from "@/interface/ITextField";
import { ViewModel } from "@next2d/framework";
import type { PointerEvent, Event } from "@next2d/events";
import { StartDragUseCase } from "@/model/application/home/usecase/StartDragUseCase";
import { StopDragUseCase } from "@/model/application/home/usecase/StopDragUseCase";
import { CenterTextFieldUseCase } from "@/model/application/home/usecase/CenterTextFieldUseCase";

/**
 * @class
 * @extends {ViewModel}
 */
export class HomeViewModel extends ViewModel
{
    // 依存性注入: UseCaseのインスタンスを保持
    private readonly startDragUseCase: StartDragUseCase;
    private readonly stopDragUseCase: StopDragUseCase;
    private readonly centerTextFieldUseCase: CenterTextFieldUseCase;

    /**
     * @description ViewModelの初期化とUseCaseの注入
     *              Initialize ViewModel and inject UseCases
     *
     * @constructor
     * @public
     */
    constructor ()
    {
        super();
        
        // UseCaseのインスタンスを生成
        this.startDragUseCase = new StartDragUseCase();
        this.stopDragUseCase = new StopDragUseCase();
        this.centerTextFieldUseCase = new CenterTextFieldUseCase();
    }

    /**
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async initialize (): Promise<void>
    {
        // 初期化処理（必要に応じて）
        return void 0;
    }

    /**
     * @description ドラッグ開始イベントのハンドラ
     *              Handler for drag start event
     *
     * @param  {PointerEvent} event
     * @return {void}
     * @method
     * @public
     */
    homeContentPointerDownEvent (event: PointerEvent): void
    {
        // インターフェースを通じてターゲットを取得
        const target = event.currentTarget as unknown as IDraggable;
        
        // UseCaseを実行
        this.startDragUseCase.execute(target);
    }

    /**
     * @description ドラッグ停止イベントのハンドラ
     *              Handler for drag stop event
     *
     * @param  {PointerEvent} event
     * @return {void}
     * @method
     * @public
     */
    homeContentPointerUpEvent (event: PointerEvent): void
    {
        const target = event.currentTarget as unknown as IDraggable;
        this.stopDragUseCase.execute(target);
    }

    /**
     * @description テキスト変更イベントのハンドラ
     *              Handler for text change event
     *
     * @param  {Event} event
     * @return {void}
     * @method
     * @public
     */
    homeTextChangeEvent (event: Event): void
    {
        const textField = event.currentTarget as unknown as ITextField;
        this.centerTextFieldUseCase.execute(textField);
    }
}
```

## 設計原則 / Design Principles

### 1. 関心の分離 / Separation of Concerns

```typescript
// ✅ 良い例: Viewは表示のみ、ViewModelはロジック
class HomeView extends View {
    async initialize() {
        // UI構築のみ
        const btn = new HomeBtnMolecule();
        btn.addEventListener(PointerEvent.POINTER_DOWN, this.vm.onClick);
    }
}

class HomeViewModel extends ViewModel {
    onClick(event: PointerEvent) {
        // ビジネスロジック実行
        this.someUseCase.execute();
    }
}

// ❌ 悪い例: Viewにビジネスロジック
class HomeView extends View {
    async initialize() {
        const btn = new HomeBtnMolecule();
        btn.addEventListener(PointerEvent.POINTER_DOWN, () => {
            // NG: Viewでビジネスロジック実行
            const data = await Repository.get();
            this.processData(data);
        });
    }
}
```

### 2. 依存性の逆転 / Dependency Inversion

ViewModelはインターフェースに依存し、具象クラスに依存しません。

ViewModel depends on interfaces, not concrete classes.

```typescript
// ✅ 良い例: インターフェースに依存
homeContentPointerDownEvent(event: PointerEvent): void {
    const target = event.currentTarget as unknown as IDraggable;
    this.startDragUseCase.execute(target);
}

// ❌ 悪い例: 具象クラスに依存
homeContentPointerDownEvent(event: PointerEvent): void {
    const target = event.currentTarget as HomeBtnMolecule;  // NG
    target.startDrag();
}
```

### 3. テスタビリティ / Testability

UseCaseをモックに差し替えることで、ViewModelを独立してテスト可能です。

ViewModel can be tested independently by replacing UseCases with mocks.

```typescript
describe('HomeViewModel', () => {
    test('should call UseCase when event is triggered', () => {
        // モックUseCaseを作成
        const mockUseCase = {
            execute: jest.fn()
        };

        // ViewModelにモックを注入
        const vm = new HomeViewModel();
        vm['startDragUseCase'] = mockUseCase;

        // イベント発火
        const mockEvent = { currentTarget: mockDraggable };
        vm.homeContentPointerDownEvent(mockEvent);

        // UseCaseが呼ばれたか検証
        expect(mockUseCase.execute).toHaveBeenCalled();
    });
});
```

## ベストプラクティス / Best Practices

### 1. ViewとViewModelは1対1

1つのViewに対して1つのViewModelを作成します。

Create one ViewModel for each View.

### 2. Viewはステートレス

Viewは状態を持たず、ViewModelから渡されたデータを表示するだけです。

View is stateless and only displays data passed from ViewModel.

### 3. イベントは必ずViewModelに委譲

View内でイベント処理を完結させず、必ずViewModelに委譲します。

Never handle events entirely within View; always delegate to ViewModel.

### 4. 型アサーションは慎重に

`as unknown as` を使う場合は、インターフェースに変換する目的のみで使用します。

When using `as unknown as`, only use it to convert to interfaces.

## 新しいView/ViewModelの作成 / Creating New View/ViewModel

### 手順 / Steps

1. **routing.jsonに追加** - 新しいルートを定義
2. **自動生成** - `npm run generate` を実行
3. **ViewModelにUseCaseを追加** - コンストラクタで依存性注入
4. **Viewに表示ロジック追加** - UIコンポーネントの配置
5. **イベント連携** - ViewからViewModelのメソッドを呼び出し

### テンプレート / Template

```typescript
// YourView.ts
import type { YourViewModel } from "./YourViewModel";
import { View } from "@next2d/framework";

export class YourView extends View {
    constructor(private readonly vm: YourViewModel) {
        super();
    }

    async initialize(): Promise<void> {
        // UIコンポーネントの作成と配置
    }

    async onEnter(): Promise<void> {
        // 画面表示時の処理
    }

    async onExit(): Promise<void> {
        // 画面非表示時の処理
    }
}

// YourViewModel.ts
import { ViewModel } from "@next2d/framework";
import { YourUseCase } from "@/model/application/your/usecase/YourUseCase";

export class YourViewModel extends ViewModel {
    private readonly yourUseCase: YourUseCase;

    constructor() {
        super();
        this.yourUseCase = new YourUseCase();
    }

    async initialize(): Promise<void> {
        return void 0;
    }

    yourEventHandler(event: Event): void {
        this.yourUseCase.execute();
    }
}
```

## 関連ドキュメント / Related Documentation

- [ARCHITECTURE.md](../../ARCHITECTURE.md) - アーキテクチャ全体の説明
- [model/README.md](../model/README.md) - Model層の説明
- [interface/README.md](../interface/README.md) - インターフェース定義
- [ui/README.md](../ui/README.md) - UIコンポーネント
- [config/README.md](../config/README.md) - ルーティング設定
