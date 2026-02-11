# Application Layer

アプリケーション層のディレクトリです。ビジネスロジックを実装するUseCaseを格納します。

Directory for the Application layer. Stores UseCases that implement business logic.

## 役割 / Role

Application層は、ユーザーのアクションに対応するビジネスロジックを提供します。この層は以下の責務を持ちます:

The Application layer provides business logic corresponding to user actions. This layer has the following responsibilities:

- ✅ **ビジネスロジックの実装** - UseCaseとして定義
- ✅ **ドメイン層の調整** - 複数のドメインロジックを組み合わせる
- ✅ **トランザクション管理** - 一連の処理の整合性を保証
- ✅ **外部サービスとの連携** - Repository経由でデータアクセス
- ❌ **UI操作** - View層の責務
- ❌ **永続化の詳細** - Infrastructure層の責務

## ディレクトリ構造 / Directory Structure

```
application/
├── home/
│   └── usecase/
│       ├── StartDragUseCase.ts
│       ├── StopDragUseCase.ts
│       └── CenterTextFieldUseCase.ts
└── top/
    └── usecase/
        └── NavigateToViewUseCase.ts
```

各画面ごとにディレクトリを作成し、その中に `usecase` ディレクトリを配置します。

Create a directory for each screen, and place the `usecase` directory within it.

## UseCase Pattern

UseCaseは、1つのユーザーアクションに対して1つのクラスを作成します。

Create one UseCase class for each user action.

### UseCaseの特徴 / UseCase Characteristics

1. **単一責任** - 1つの明確な目的を持つ
2. **再利用可能** - 異なるViewModelから呼び出せる
3. **テスタブル** - 独立してテスト可能
4. **インターフェース指向** - 抽象に依存する

### Example: StartDragUseCase

```typescript
import type { IDraggable } from "@/interface/IDraggable";

/**
 * @description ドラッグ開始のユースケース
 *              Use case for starting drag
 *
 * @class
 */
export class StartDragUseCase
{
    /**
     * @description ドラッグ可能なオブジェクトのドラッグを開始する
     *              Start dragging a draggable object
     *
     * @param  {IDraggable} target
     * @return {void}
     * @method
     * @public
     */
    execute (target: IDraggable): void
    {
        // ビジネスルールを実装
        // 例: ドラッグ可能かチェック、ログ記録など
        
        target.startDrag();
    }
}
```

### Example: NavigateToViewUseCase

```typescript
import type { ViewName } from "@/interface/IViewName";
import { app } from "@next2d/framework";

/**
 * @description 画面遷移のユースケース
 *              Use case for navigating to a view
 *
 * @class
 */
export class NavigateToViewUseCase
{
    /**
     * @description 指定された画面に遷移する
     *              Navigate to the specified view
     *
     * @param  {ViewName} viewName
     * @return {Promise<void>}
     * @method
     * @public
     */
    async execute (viewName: ViewName): Promise<void>
    {
        // ビジネスルール: 遷移前の検証など
        // 例: 未保存データのチェック、権限確認など
        
        await app.gotoView(viewName);
    }
}
```

**ポイント / Key Points:**
- `ViewName` 型を使用することで、存在しない画面名を指定するとコンパイルエラーになる
- 型安全な画面遷移を実現

### Example: CenterTextFieldUseCase

```typescript
import type { ITextField } from "@/interface/ITextField";

/**
 * @description テキストフィールド中央揃えのユースケース
 *              Use case for centering text field
 *
 * @class
 */
export class CenterTextFieldUseCase
{
    /**
     * @description テキストフィールドを画面中央に配置する
     *              Center the text field on the screen
     *
     * @param  {ITextField} textField
     * @param  {number} stageWidth - ステージの幅 / Stage width
     * @return {void}
     * @method
     * @public
     */
    execute (textField: ITextField, stageWidth: number): void
    {
        // ビジネスロジック: 中央配置の計算
        textField.x = (stageWidth - textField.width) / 2;
    }
}
```

**ポイント / Key Points:**
- `config` に直接依存せず、`stageWidth` を引数で受け取る
- テスタビリティが向上（任意の幅でテスト可能）

## UseCaseの設計原則 / UseCase Design Principles

### 1. インターフェースに依存 / Depend on Interfaces

具象クラスではなく、インターフェースに依存します。

Depend on interfaces, not concrete classes.

```typescript
// ✅ 良い例: インターフェースに依存
export class StartDragUseCase {
    execute(target: IDraggable): void {
        target.startDrag();
    }
}

// ❌ 悪い例: 具象クラスに依存
export class StartDragUseCase {
    execute(target: HomeBtnMolecule): void {  // NG: UIコンポーネントに依存
        target.startDrag();
    }
}
```

### 2. 単一責任の原則 / Single Responsibility Principle

1つのUseCaseは1つの責務のみを持ちます。

One UseCase has only one responsibility.

```typescript
// ✅ 良い例: 単一の責務
export class StartDragUseCase {
    execute(target: IDraggable): void {
        target.startDrag();
    }
}

export class StopDragUseCase {
    execute(target: IDraggable): void {
        target.stopDrag();
    }
}

// ❌ 悪い例: 複数の責務
export class DragUseCase {
    start(target: IDraggable): void { ... }
    stop(target: IDraggable): void { ... }
    validate(target: IDraggable): boolean { ... }
    log(message: string): void { ... }  // NG: 責務が多すぎる
}
```

### 3. 副作用の明示 / Explicit Side Effects

副作用（状態変更、外部API呼び出しなど）を明確にします。

Make side effects (state changes, external API calls, etc.) explicit.

```typescript
// ✅ 良い例: 非同期処理を明示
export class FetchDataUseCase {
    async execute(id: string): Promise<Data> {  // async/await
        const data = await Repository.get(id);
        return data;
    }
}

// ✅ 良い例: 同期処理
export class ValidateInputUseCase {
    execute(input: string): boolean {  // 同期
        return input.length > 0;
    }
}
```

### 4. エラーハンドリング / Error Handling

適切にエラーを処理し、上位層に伝播させます。

Handle errors appropriately and propagate to upper layers.

```typescript
export class FetchUserDataUseCase {
    async execute(userId: string): Promise<UserData> {
        try {
            // Repositoryでもエラーハンドリングされているが
            // UseCase層でも必要に応じて処理
            const data = await UserRepository.get(userId);
            
            // ビジネスルールのバリデーション
            if (!this.validateUserData(data)) {
                throw new Error('Invalid user data');
            }
            
            return data;
        } catch (error) {
            // ログ記録
            console.error('Failed to fetch user data:', error);
            
            // 上位層にエラーを伝播
            throw error;
        }
    }
    
    private validateUserData(data: UserData): boolean {
        // バリデーションロジック
        return data !== null && data.id !== undefined;
    }
}
```

## UseCase と Repository の連携 / UseCase and Repository Collaboration

UseCaseは、データアクセスが必要な場合はRepositoryを使用します。

UseCases use Repositories when data access is needed.

```typescript
import { HomeTextRepository } from "@/model/infrastructure/repository/HomeTextRepository";
import type { IHomeTextResponse } from "@/interface/IHomeTextResponse";

export class FetchHomeTextUseCase {
    /**
     * @description Home画面のテキストを取得
     *              Fetch text for Home screen
     *
     * @return {Promise<IHomeTextResponse>}
     * @method
     * @public
     */
    async execute(): Promise<IHomeTextResponse> {
        try {
            // Repositoryでデータ取得
            const data = await HomeTextRepository.get();
            
            // ビジネスロジック: データの加工や検証
            // 例: キャッシュの確認、デフォルト値の設定など
            
            return data;
        } catch (error) {
            console.error('Failed to fetch home text:', error);
            
            // フォールバック: デフォルト値を返す
            return { word: 'Hello, World!' };
        }
    }
}
```

## 複数のUseCaseの組み合わせ / Combining Multiple UseCases

複雑な処理は、複数のUseCaseを組み合わせて実装します。

Implement complex processes by combining multiple UseCases.

```typescript
export class InitializeHomeScreenUseCase {
    private readonly fetchTextUseCase: FetchHomeTextUseCase;
    private readonly centerTextUseCase: CenterTextFieldUseCase;
    
    constructor() {
        this.fetchTextUseCase = new FetchHomeTextUseCase();
        this.centerTextUseCase = new CenterTextFieldUseCase();
    }
    
    async execute(textField: ITextField): Promise<void> {
        // 1. データ取得
        const data = await this.fetchTextUseCase.execute();
        
        // 2. テキスト設定（ViewModelで実施）
        
        // 3. 中央配置
        this.centerTextUseCase.execute(textField);
    }
}
```

## テスト / Testing

UseCaseは独立してテスト可能です。

UseCases can be tested independently.

```typescript
import { StartDragUseCase } from "./StartDragUseCase";
import type { IDraggable } from "@/interface/IDraggable";

describe('StartDragUseCase', () => {
    test('should call startDrag on target', () => {
        // モックオブジェクトを作成
        const mockDraggable: IDraggable = {
            startDrag: jest.fn(),
            stopDrag: jest.fn()
        };
        
        // UseCaseを実行
        const useCase = new StartDragUseCase();
        useCase.execute(mockDraggable);
        
        // startDragが呼ばれたか検証
        expect(mockDraggable.startDrag).toHaveBeenCalled();
    });
});
```

## 新しいUseCaseの作成 / Creating New UseCases

### 手順 / Steps

1. **ユーザーアクションを特定** - どのような操作か
2. **インターフェースを定義** - 必要に応じて `interface/` に追加
3. **UseCaseクラスを作成** - `execute` メソッドを実装
4. **ViewModelで使用** - コンストラクタで依存性注入
5. **テストを作成** - ユニットテストを追加

### テンプレート / Template

```typescript
import type { IYourInterface } from "@/interface/IYourInterface";

/**
 * @description [UseCaseの説明]
 *              [UseCase description]
 *
 * @class
 */
export class YourUseCase
{
    /**
     * @description [処理の説明]
     *              [Process description]
     *
     * @param  {ParamType} param
     * @return {ReturnType}
     * @method
     * @public
     */
    execute (param: ParamType): ReturnType
    {
        // ビジネスロジックを実装
        
        return result;
    }
}
```

## ベストプラクティス / Best Practices

1. **1クラス1責務** - 各UseCaseは明確な1つの目的を持つ
2. **executeメソッド** - UseCaseのエントリーポイントは `execute` に統一
3. **インターフェース優先** - 具象クラスへの依存を避ける
4. **テスタブル** - 依存をモックに差し替え可能にする
5. **ドキュメント** - JSDocで処理内容を明記

## 関連ドキュメント / Related Documentation

- [ARCHITECTURE.md](../../../ARCHITECTURE.md) - アーキテクチャ全体の説明
- [../domain/README.md](../domain/README.md) - Domain層の説明
- [../infrastructure/README.md](../infrastructure/README.md) - Infrastructure層の説明
- [../../interface/README.md](../../interface/README.md) - インターフェース定義
- [../../view/README.md](../../view/README.md) - View層の説明
