# Model Layer (Application / Domain / Infrastructure)

Model層はビジネスロジックとデータアクセスを担当。Clean Architectureに基づき3層で構成。

## Directory Structure

```
model/
├── application/           # UseCase (ビジネスロジック)
│   └── {screen}/
│       └── usecase/
│           └── {Action}UseCase.ts
├── domain/                # コアビジネスロジック
│   └── {feature}/
│       ├── {Feature}.ts
│       └── service/
│           └── {Feature}{Action}Service.ts
└── infrastructure/        # Repository (データアクセス)
    └── repository/
        └── {Resource}Repository.ts
```

## Layer Dependencies

```
Application → Domain (uses)
Application → Infrastructure (calls)
Domain → 依存なし (最も安定)
```

---

## Application Layer (UseCase)

### Rules

- 1つのユーザーアクションに対して1つのUseCaseクラスを作成
- エントリーポイントは `execute` メソッドに統一
- インターフェースに依存し、具象クラスに依存しない
- 画面ごとにディレクトリを作成: `application/{screen}/usecase/`

### UseCase Template

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
     * @param  {IYourInterface} param
     * @return {void}
     * @method
     * @public
     */
    execute (param: IYourInterface): void
    {
        // ビジネスロジックを実装
    }
}
```

### UseCase with Repository

```typescript
import { YourRepository } from "@/model/infrastructure/repository/YourRepository";
import type { IYourResponse } from "@/interface/IYourResponse";

export class FetchDataUseCase
{
    async execute (): Promise<IYourResponse>
    {
        try {
            const data = await YourRepository.get();
            // ビジネスロジック: データの加工・検証
            return data;
        } catch (error) {
            console.error('Failed to fetch data:', error);
            throw error;
        }
    }
}
```

### UseCase Composition (複数UseCaseの組み合わせ)

```typescript
export class InitializeScreenUseCase
{
    private readonly fetchUseCase: FetchDataUseCase;
    private readonly centerUseCase: CenterTextFieldUseCase;

    constructor ()
    {
        this.fetchUseCase = new FetchDataUseCase();
        this.centerUseCase = new CenterTextFieldUseCase();
    }

    async execute (textField: ITextField): Promise<void>
    {
        const data = await this.fetchUseCase.execute();
        this.centerUseCase.execute(textField, stageWidth);
    }
}
```

### UseCase Anti-Patterns

```typescript
// NG: 複数の責務
export class DragUseCase {
    start(target: IDraggable): void { ... }
    stop(target: IDraggable): void { ... }
    validate(target: IDraggable): boolean { ... }
}

// OK: 単一の責務
export class StartDragUseCase {
    execute(target: IDraggable): void { target.startDrag(); }
}
export class StopDragUseCase {
    execute(target: IDraggable): void { target.stopDrag(); }
}

// NG: 具象クラスに依存
execute(target: HomeBtnMolecule): void { ... }

// OK: インターフェースに依存
execute(target: IDraggable): void { ... }
```

### UseCase Test Template

```typescript
import { StartDragUseCase } from "./StartDragUseCase";
import type { IDraggable } from "@/interface/IDraggable";

describe('StartDragUseCase', () => {
    test('should call startDrag on target', () => {
        const mockDraggable: IDraggable = {
            startDrag: vi.fn(),
            stopDrag: vi.fn()
        };

        const useCase = new StartDragUseCase();
        useCase.execute(mockDraggable);

        expect(mockDraggable.startDrag).toHaveBeenCalled();
    });
});
```

---

## Domain Layer

### Rules

- アプリケーションのコアビジネスルールを実装
- 可能な限りフレームワーク非依存（※Next2D描画機能の使用は許容）
- 純粋関数を心がけ、副作用を最小化
- 可能な限り不変オブジェクトを使用

### Domain Service (Functional Style)

```typescript
/**
 * @description [サービスの説明]
 *              [Service description]
 *
 * @param  {ParamType} param
 * @return {ReturnType}
 */
export const execute = (param: ParamType): ReturnType =>
{
    // ビジネスルールの実装
    return result;
};
```

### Domain Class (Class-based Style)

```typescript
import { Shape, stage } from "@next2d/display";
import { Event } from "@next2d/events";

/**
 * @description [ドメインクラスの説明]
 *              [Domain class description]
 *
 * @class
 */
export class YourDomainClass
{
    public readonly shape: Shape;

    constructor ()
    {
        this.shape = new Shape();
    }

    execute (): void
    {
        // コアビジネスロジック
    }
}
```

### Domain Callback Pattern

`config.json`の`gotoView.callback`で設定されたクラスは、画面遷移完了後に`execute()`が呼び出される。

```typescript
// config.json: "gotoView": { "callback": ["domain.callback.Background"] }
// → model/domain/callback/Background.ts の execute() が呼ばれる

export class Background
{
    execute (): void
    {
        const context = app.getContext();
        const view = context.view;
        if (!view) return;
        view.addChildAt(this.shape, 0);
    }
}
```

### Domain Directory Extensions (将来の拡張)

```
domain/
├── callback/      # コールバック処理
├── service/       # ドメインサービス
├── entity/        # エンティティ (ID持ち)
└── value-object/  # 値オブジェクト
```

---

## Infrastructure Layer (Repository)

### Rules

- 外部システムとの連携（API、DB等）を担当
- `any`型を避け、明示的な型定義を使用
- すべての外部アクセスでtry-catchを実装
- エンドポイントは`config`から取得（ハードコーディング禁止）
- シンプルな場合は静的メソッド、状態を持つ場合はインスタンスメソッド

### Repository Template

```typescript
import type { IYourResponse } from "@/interface/IYourResponse";
import { config } from "@/config/Config";

/**
 * @description [Repositoryの説明]
 *              [Repository description]
 *
 * @class
 */
export class YourRepository
{
    /**
     * @description [処理の説明]
     *              [Process description]
     *
     * @param  {string} id
     * @return {Promise<IYourResponse>}
     * @static
     * @throws {Error} [エラーの説明]
     */
    static async get (id: string): Promise<IYourResponse>
    {
        try {
            const response = await fetch(
                `${config.api.endPoint}api/your-endpoint/${id}`
            );

            if (!response.ok) {
                throw new Error(
                    `HTTP error! status: ${response.status}`
                );
            }

            return await response.json() as IYourResponse;

        } catch (error) {
            console.error('Failed to fetch data:', error);
            throw error;
        }
    }
}
```

### Repository with Cache

```typescript
export class CachedRepository
{
    private static cache: Map<string, { data: Data; timestamp: number }> = new Map();
    private static readonly CACHE_TTL = 60000;

    static async get (id: string): Promise<Data>
    {
        const cached = this.cache.get(id);
        const now = Date.now();

        if (cached && (now - cached.timestamp) < this.CACHE_TTL) {
            return cached.data;
        }

        const response = await fetch(`${config.api.endPoint}api/${id}`);
        const data = await response.json();
        this.cache.set(id, { data, timestamp: now });

        return data;
    }
}
```

### Repository Anti-Patterns

```typescript
// NG: any型
static async get(): Promise<any> { ... }

// OK: 明示的型定義
static async get(): Promise<IHomeTextResponse> { ... }

// NG: エラーハンドリングなし
static async get(): Promise<Data> {
    const response = await fetch(...);
    return await response.json();
}

// NG: ハードコーディング
const response = await fetch('https://example.com/api/data.json');

// OK: configから取得
const response = await fetch(`${config.api.endPoint}api/data.json`);
```

### routing.json Custom Request Pattern

`routing.json`でRepositoryを直接呼び出すことも可能:

```json
{
    "home": {
        "requests": [
            {
                "type": "custom",
                "class": "infrastructure.repository.HomeTextRepository",
                "access": "static",
                "method": "get",
                "name": "HomeText",
                "cache": true
            }
        ]
    }
}
```

取得したデータは `app.getResponse().get("HomeText")` でアクセス可能。
