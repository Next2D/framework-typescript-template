# View / ViewModel (MVVM Pattern)

## Rules

- 1画面にView + ViewModelをワンセット作成
- ディレクトリ名はキャメルケースの最初のブロック (例: `questList` → `view/quest/`)
- Viewは表示構造のみ担当、ビジネスロジックはViewModelに委譲
- イベントは必ずViewModelに委譲（View内で完結させない）
- ViewModelはインターフェースに依存し、具象クラスに依存しない

## Lifecycle (実行順序)

```
1. ViewModel インスタンス生成
2. ViewModel.initialize()    ← ViewModelが先
3. View インスタンス生成 (ViewModelを注入)
4. View.initialize()         ← UIコンポーネントの構築
5. View.onEnter()            ← 画面表示時の処理
   (ユーザー操作)
6. View.onExit()             ← 画面非表示時の処理
```

### View Lifecycle Methods

| Method | Timing | Purpose | Do | Don't |
|--------|--------|---------|-----|-------|
| `initialize()` | View生成直後、表示前 | UIコンポーネントの生成・配置・イベントリスナー登録 | addChild, addEventListener | API呼び出し、重い処理 |
| `onEnter()` | initialize完了後、画面表示直前 | 入場アニメーション、データ取得、タイマー開始 | アニメーション再生、fetchInitialData | UIコンポーネント生成 |
| `onExit()` | 別画面遷移前 | アニメーション停止、タイマークリア、リソース解放 | clearInterval, 状態リセット | 新リソース作成 |

### ViewModel Lifecycle Methods

| Method | Timing | Purpose | View参照 |
|--------|--------|---------|---------|
| `constructor()` | インスタンス生成時 | UseCaseの生成 | 不可 |
| `initialize()` | Viewの`initialize()`より前 | 初期データ取得、状態初期化 | 不可 |
| イベントハンドラ | ユーザー操作時 | ビジネスロジック実行 | 可能 |

## View Class Template

```typescript
import type { {Screen}ViewModel } from "./{Screen}ViewModel";
import { View } from "@next2d/framework";

/**
 * @class
 * @extends {View}
 */
export class {Screen}View extends View
{
    /**
     * @param {{Screen}ViewModel} vm
     * @constructor
     * @public
     */
    constructor (
        private readonly vm: {Screen}ViewModel
    ) {
        super();
    }

    /**
     * @description 画面の初期化 - UIコンポーネントの構築
     *              Initialize - Build UI components
     *
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async initialize (): Promise<void>
    {
        // UIコンポーネントの作成と配置
        // イベントリスナーの登録 (ViewModelのメソッドに接続)
    }

    /**
     * @description 画面表示時の処理
     *              On screen shown
     *
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async onEnter (): Promise<void>
    {
        // 入場アニメーション、データ取得
    }

    /**
     * @description 画面非表示時の処理
     *              On screen hidden
     *
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async onExit (): Promise<void>
    {
        // タイマークリア、リソース解放
    }
}
```

## ViewModel Class Template

```typescript
import { ViewModel } from "@next2d/framework";
import { YourUseCase } from "@/model/application/{screen}/usecase/YourUseCase";

/**
 * @class
 * @extends {ViewModel}
 */
export class {Screen}ViewModel extends ViewModel
{
    private readonly yourUseCase: YourUseCase;

    constructor ()
    {
        super();
        this.yourUseCase = new YourUseCase();
    }

    /**
     * @description ViewModelの初期化 (Viewのinitialize()より前に呼ばれる)
     *              Initialize ViewModel (called before View's initialize())
     *
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async initialize (): Promise<void>
    {
        // 初期データ取得、状態初期化
        // ※ この時点ではViewは未生成のためUI操作不可
    }

    /**
     * @description イベントハンドラ
     *              Event handler
     *
     * @param  {PointerEvent} event
     * @return {void}
     * @method
     * @public
     */
    yourEventHandler (event: PointerEvent): void
    {
        // インターフェースを通じてターゲットを取得
        const target = event.currentTarget as unknown as IYourInterface;
        this.yourUseCase.execute(target);
    }
}
```

## View-ViewModel Coordination Pattern

ViewModelの`initialize()`で事前取得したデータをViewで使用するパターン:

```typescript
// ViewModel: 事前にデータ取得
async initialize(): Promise<void> {
    const data = await HomeTextRepository.get();
    this.homeText = data.word;
}

getHomeText(): string {
    return this.homeText;
}

// View: ViewModelから取得済みデータを使用
async initialize(): Promise<void> {
    // vm.initialize()は既に完了している
    const text = this.vm.getHomeText();
    const textField = new TextAtom(text);
    this.addChild(textField);
}
```

## Code Generation

```bash
npm run generate
```

`routing.json`のトッププロパティ値を分解し、`view`ディレクトリ直下に対象ディレクトリがなければ作成。View/ViewModelが存在しない場合のみ新規クラスを生成。

## Anti-Patterns

```typescript
// NG: Viewでビジネスロジック
class BadView extends View {
    async initialize() {
        btn.addEventListener(PointerEvent.POINTER_DOWN, async () => {
            const data = await Repository.get(); // NG
            this.processData(data);              // NG
        });
    }
}

// NG: ViewModelで具象クラスに依存
homeContentPointerDownEvent(event: PointerEvent): void {
    const target = event.currentTarget as HomeBtnMolecule; // NG
    target.startDrag();
}

// OK: ViewModelでインターフェースに依存
homeContentPointerDownEvent(event: PointerEvent): void {
    const target = event.currentTarget as unknown as IDraggable; // OK
    this.startDragUseCase.execute(target);
}
```
