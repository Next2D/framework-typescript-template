# Infrastructure Layer

インフラストラクチャ層のディレクトリです。外部システムとの連携やデータ永続化の詳細を実装します。

Directory for the Infrastructure layer. Implements details of integration with external systems and data persistence.

## 役割 / Role

Infrastructure層は、アプリケーションの外部とのやり取りを担当します:

The Infrastructure layer is responsible for interactions with the outside of the application:

- ✅ **データアクセス** - API通信、データベースアクセス
- ✅ **外部サービス連携** - サードパーティAPIの呼び出し
- ✅ **永続化の実装** - ストレージへの保存/読み込み
- ✅ **エラーハンドリング** - 外部システムのエラーを適切に処理
- ❌ **ビジネスロジック** - Application/Domain層の責務
- ❌ **UI操作** - View層の責務

## ディレクトリ構造 / Directory Structure

```
infrastructure/
└── repository/
    └── HomeTextRepository.ts
```

将来的に以下のような拡張も可能です:

Future extensions are possible, such as:

```
infrastructure/
├── repository/                # データアクセス層
│   ├── HomeTextRepository.ts
│   ├── UserRepository.ts
│   └── ConfigRepository.ts
├── entity/                    # DBエンティティ
│   └── UserEntity.ts
├── dto/                       # データ転送
│   └── ApiResponseDto.ts
└── external/                  # 外部サービス
    └── AnalyticsService.ts
```

## Repository Pattern

Repositoryパターンは、データアクセスの詳細を抽象化し、Application層から隔離します。

The Repository pattern abstracts data access details and isolates them from the Application layer.

### Repository の特徴 / Repository Characteristics

1. **データソースの抽象化** - APIやDBなどの詳細を隠蔽
2. **統一されたインターフェース** - 一貫したデータアクセス方法
3. **テスタビリティ** - モックに差し替え可能
4. **エラーハンドリング** - 外部システムのエラーを適切に処理

### Example: HomeTextRepository

```typescript
import type { IHomeTextResponse } from "@/interface/IHomeTextResponse";
import { config } from "@/config/Config";

/**
 * @description Home画面のテキストデータを管理するRepository
 *              Repository for managing Home screen text data
 *
 * @class
 */
export class HomeTextRepository
{
    /**
     * @description Home画面のテキストデータを取得
     *              Get text data for Home screen
     *
     * @return {Promise<IHomeTextResponse>}
     * @static
     * @throws {Error} Failed to fetch home text
     */
    static async get (): Promise<IHomeTextResponse>
    {
        try {
            // APIエンドポイントへリクエスト
            const response = await fetch(
                `${config.api.endPoint}api/home.json`
            );

            // HTTPエラーチェック
            if (!response.ok) {
                throw new Error(
                    `HTTP error! status: ${response.status}`
                );
            }

            // レスポンスをパース
            return await response.json() as IHomeTextResponse;
            
        } catch (error) {
            // エラーログ
            console.error('Failed to fetch home text:', error);
            
            // エラーを上位層に伝播
            throw error;
        }
    }
}
```

## Repository の設計原則 / Repository Design Principles

### 1. 型安全性 / Type Safety

`any` 型を避け、明示的な型定義を使用します。

Avoid `any` type and use explicit type definitions.

```typescript
// ✅ 良い例: 明示的な型定義
static async get(): Promise<IHomeTextResponse> {
    const response = await fetch(...);
    return await response.json() as IHomeTextResponse;
}

// ❌ 悪い例: any型
static async get(): Promise<any> {  // NG
    const response = await fetch(...);
    return await response.json();
}
```

### 2. エラーハンドリング / Error Handling

すべての外部アクセスでエラーハンドリングを実装します。

Implement error handling for all external access.

```typescript
// ✅ 良い例: 適切なエラーハンドリング
static async get(): Promise<IHomeTextResponse> {
    try {
        const response = await fetch(...);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch:', error);
        throw error;  // 上位層に伝播
    }
}

// ❌ 悪い例: エラーハンドリングなし
static async get(): Promise<IHomeTextResponse> {
    const response = await fetch(...);  // エラーが握りつぶされる
    return await response.json();
}
```

### 3. 設定の外部化 / Externalize Configuration

エンドポイントなどの設定は `config` から取得します。

Retrieve settings such as endpoints from `config`.

```typescript
// ✅ 良い例: 設定を外部化
static async get(): Promise<Data> {
    const response = await fetch(
        `${config.api.endPoint}api/data.json`
    );
    return await response.json();
}

// ❌ 悪い例: ハードコーディング
static async get(): Promise<Data> {
    const response = await fetch(
        'https://example.com/api/data.json'  // NG
    );
    return await response.json();
}
```

### 4. 静的メソッド vs インスタンスメソッド / Static vs Instance Methods

シンプルな場合は静的メソッド、状態を持つ場合はインスタンスメソッドを使用します。

Use static methods for simple cases, instance methods when holding state.

```typescript
// ✅ 静的メソッド: ステートレスな場合
export class SimpleRepository {
    static async get(id: string): Promise<Data> {
        const response = await fetch(`/api/${id}`);
        return await response.json();
    }
}

// ✅ インスタンスメソッド: 状態を持つ場合
export class CachedRepository {
    private cache: Map<string, Data> = new Map();
    
    async get(id: string): Promise<Data> {
        if (this.cache.has(id)) {
            return this.cache.get(id)!;
        }
        
        const response = await fetch(`/api/${id}`);
        const data = await response.json();
        this.cache.set(id, data);
        
        return data;
    }
}
```

## 高度なエラーハンドリング / Advanced Error Handling

### リトライ機能 / Retry Functionality

```typescript
export class RobustRepository {
    private static readonly MAX_RETRIES = 3;
    private static readonly RETRY_DELAY = 1000;
    
    static async get(id: string): Promise<Data> {
        let lastError: Error | null = null;
        
        for (let i = 0; i < this.MAX_RETRIES; i++) {
            try {
                const response = await fetch(`/api/${id}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                
                return await response.json();
            } catch (error) {
                lastError = error as Error;
                console.warn(`Retry ${i + 1}/${this.MAX_RETRIES}:`, error);
                
                if (i < this.MAX_RETRIES - 1) {
                    await this.sleep(this.RETRY_DELAY);
                }
            }
        }
        
        throw new Error(`Failed after ${this.MAX_RETRIES} retries: ${lastError}`);
    }
    
    private static sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
```

### タイムアウト処理 / Timeout Handling

```typescript
export class TimeoutRepository {
    private static readonly TIMEOUT = 5000;  // 5秒
    
    static async get(id: string): Promise<Data> {
        const controller = new AbortController();
        const timeoutId = setTimeout(
            () => controller.abort(),
            this.TIMEOUT
        );
        
        try {
            const response = await fetch(`/api/${id}`, {
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error instanceof Error && error.name === 'AbortError') {
                throw new Error(`Request timeout after ${this.TIMEOUT}ms`);
            }
            
            throw error;
        }
    }
}
```

## キャッシング戦略 / Caching Strategy

### メモリキャッシュ / Memory Cache

```typescript
export class CachedRepository {
    private static cache: Map<string, {
        data: Data;
        timestamp: number;
    }> = new Map();
    
    private static readonly CACHE_TTL = 60000;  // 1分
    
    static async get(id: string): Promise<Data> {
        // キャッシュチェック
        const cached = this.cache.get(id);
        const now = Date.now();
        
        if (cached && (now - cached.timestamp) < this.CACHE_TTL) {
            console.log('Cache hit:', id);
            return cached.data;
        }
        
        // APIから取得
        console.log('Cache miss:', id);
        const response = await fetch(`/api/${id}`);
        const data = await response.json();
        
        // キャッシュに保存
        this.cache.set(id, {
            data,
            timestamp: now
        });
        
        return data;
    }
    
    static clearCache(): void {
        this.cache.clear();
    }
}
```

## モック実装 / Mock Implementation

テスト用のモックRepositoryを作成できます。

You can create mock Repositories for testing.

```typescript
// テスト用モック
export class MockHomeTextRepository {
    static async get(): Promise<IHomeTextResponse> {
        // モックデータを返す
        return {
            word: 'Mock Data'
        };
    }
}

// テストコード
import { MockHomeTextRepository } from './MockHomeTextRepository';

describe('HomeViewModel', () => {
    test('should display mock data', async () => {
        // Repositoryをモックに差し替え
        const data = await MockHomeTextRepository.get();
        expect(data.word).toBe('Mock Data');
    });
});
```

## 新しいRepositoryの作成 / Creating New Repositories

### 手順 / Steps

1. **データ構造を定義** - `interface/` にレスポンス型を追加
2. **Repositoryクラスを作成** - `infrastructure/repository/` に配置
3. **エラーハンドリング実装** - try-catchで適切に処理
4. **型定義を追加** - `any` を避け明示的な型を使用
5. **UseCaseから使用** - Application層で呼び出し

### テンプレート / Template

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

## ベストプラクティス / Best Practices

1. **型安全性** - `any` 型を避け、明示的な型定義を使用
2. **エラーハンドリング** - すべての外部アクセスでtry-catchを実装
3. **設定の外部化** - エンドポイントなどは `config` から取得
4. **ログ出力** - エラー時は詳細なログを出力
5. **単一責任** - 1つのRepositoryは1つのデータソースを担当

## 関連ドキュメント / Related Documentation

- [ARCHITECTURE.md](../../../ARCHITECTURE.md) - アーキテクチャ全体の説明
- [../application/README.md](../application/README.md) - Application層の説明
- [../../interface/README.md](../../interface/README.md) - インターフェース定義
- [../../config/README.md](../../config/README.md) - 設定ファイル
