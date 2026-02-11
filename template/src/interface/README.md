# Interface

TypeScriptのインターフェース定義を格納するディレクトリです。クリーンアーキテクチャの原則に従い、各層の依存関係を抽象化します。

Directory for storing TypeScript interface definitions. Following Clean Architecture principles, this abstracts dependencies between layers.

## 役割 / Role

インターフェースは以下の目的で使用されます:

Interfaces are used for the following purposes:

1. **依存性の逆転** - 上位層が下位層の具象クラスに直接依存しない
2. **テスタビリティ** - モックやスタブの作成が容易
3. **疎結合** - 実装の変更が他の層に影響しにくい
4. **型安全性** - TypeScriptの型システムを最大限活用

1. **Dependency Inversion** - Higher layers don't depend directly on concrete classes in lower layers
2. **Testability** - Easy to create mocks and stubs
3. **Loose Coupling** - Implementation changes are less likely to affect other layers
4. **Type Safety** - Maximize use of TypeScript's type system

## インターフェースの分類 / Interface Categories

### 1. UI関連インターフェース / UI-related Interfaces

UIコンポーネントの振る舞いを定義します。

Defines the behavior of UI components.

#### IDraggable.ts
ドラッグ可能なオブジェクトのインターフェースです。

Interface for draggable objects.

```typescript
export interface IDraggable {
    startDrag(): void;
    stopDrag(): void;
}
```

**使用例 / Usage:**
- `HomeBtnMolecule` - ボタンコンポーネント
- `HomeContent` - アニメーションコンテンツ

#### ITextField.ts
テキストフィールドの基本プロパティを定義します。

Defines basic properties for text fields.

```typescript
export interface ITextField {
    width: number;
    x: number;
}
```

**使用例 / Usage:**
- `TextAtom` - テキストアトムコンポーネント
- `CenterTextFieldUseCase` - テキスト中央揃えユースケース

#### ITextFieldProps.ts
テキストフィールドの詳細なプロパティ設定を定義します。

Defines detailed property settings for text fields.

**使用例 / Usage:**
- `TextAtom`のコンストラクタで使用

#### ITextFormatObject.ts
テキストフォーマットのスタイル設定を定義します。

Defines style settings for text formatting.

**使用例 / Usage:**
- `TextAtom`のテキストスタイル設定

### 2. データ転送オブジェクト (DTO) / Data Transfer Objects

APIレスポンスやデータ構造を型定義します。

Type definitions for API responses and data structures.

#### IHomeTextResponse.ts
Home画面のテキストAPIレスポンスの型です。

Type definition for Home screen text API response.

```typescript
export interface IHomeTextResponse {
    word: string;
}
```

**使用例 / Usage:**
- `HomeTextRepository.get()` の戻り値型
- API通信の型安全性を確保

### 3. 設定関連インターフェース / Configuration Interfaces

アプリケーション設定の型定義です。

Type definitions for application configuration.

#### IConfig.ts
アプリケーション全体の設定を定義します。

Defines the overall application configuration.

**使用例 / Usage:**
- `config/Config.ts` で使用
- アプリケーションの初期化時に使用

#### IStage.ts
ステージ(画面領域)の設定を定義します。

Defines stage (screen area) configuration.

**使用例 / Usage:**
- `config/stage.json` の型定義

#### IRouting.ts
ルーティング設定の型定義です。

Type definition for routing configuration.

**使用例 / Usage:**
- `config/routing.json` の型定義

#### IGotoView.ts
画面遷移のオプション設定を定義します。

Defines options for view navigation.

**使用例 / Usage:**
- `app.gotoView()` のパラメータ型

#### IRequest.ts / IRequestType.ts
HTTPリクエストの設定を定義します。

Defines HTTP request configuration.

**使用例 / Usage:**
- `routing.json` の `requests` 配列の型定義

### 4. 画面遷移関連 / View Navigation

#### IViewName.ts
利用可能な画面名をUnion型で定義します。

Defines available view names as a Union type.

```typescript
export type ViewName = "top" | "home";
```

**使用例 / Usage:**
- `NavigateToViewUseCase` - 画面遷移時の型安全性を確保
- 新しい画面を追加した場合は、この型にも追加が必要

## ベストプラクティス / Best Practices

### 1. インターフェースの命名規則 / Interface Naming Convention

```typescript
// ✅ 良い例: "I" プレフィックスを使用
export interface IDraggable { ... }
export interface ITextField { ... }

// ❌ 悪い例: プレフィックスなし
export interface Draggable { ... }
```

### 2. 最小限のプロパティ定義 / Minimal Property Definition

必要最小限のプロパティのみを定義します。

Define only the minimum required properties.

```typescript
// ✅ 良い例: 必要なプロパティのみ
export interface ITextField {
    width: number;
    x: number;
}

// ❌ 悪い例: 不要なプロパティも含む
export interface ITextField {
    width: number;
    height: number;  // 使用しない
    x: number;
    y: number;      // 使用しない
}
```

### 3. 型の再利用 / Type Reusability

共通の型は別のインターフェースとして定義します。

Define common types as separate interfaces.

```typescript
// ✅ 良い例
export interface IPosition {
    x: number;
    y: number;
}

export interface ITextField extends IPosition {
    width: number;
}
```

### 4. `any` 型の禁止 / Avoid `any` Type

常に明示的な型を使用します。

Always use explicit types.

```typescript
// ✅ 良い例
export interface IHomeTextResponse {
    word: string;
}

// ❌ 悪い例
export interface IHomeTextResponse {
    word: any;
}
```

## 新しいインターフェースの追加 / Adding New Interfaces

新しいインターフェースを追加する際は、以下の手順に従ってください。

Follow these steps when adding new interfaces:

1. **目的を明確にする** - どの層の依存を抽象化するか
2. **命名規則に従う** - "I" プレフィックスを使用
3. **最小限に保つ** - 必要なプロパティ/メソッドのみ
4. **ドキュメントを記述** - JSDocコメントを追加
5. **使用例を確認** - 実際に使用される場所を明記

1. **Clarify Purpose** - Which layer's dependency will be abstracted
2. **Follow Naming Convention** - Use "I" prefix
3. **Keep Minimal** - Only necessary properties/methods
4. **Write Documentation** - Add JSDoc comments
5. **Verify Usage** - Document where it will be used

### テンプレート / Template

```typescript
/**
 * @description [インターフェースの説明]
 *              [Interface description]
 *
 * @interface
 */
export interface IYourInterface {
    /**
     * @description [プロパティの説明]
     *              [Property description]
     *
     * @type {type}
     */
    propertyName: type;

    /**
     * @description [メソッドの説明]
     *              [Method description]
     *
     * @param  {ParamType} paramName
     * @return {ReturnType}
     * @method
     */
    methodName(paramName: ParamType): ReturnType;
}
```

## 関連ドキュメント / Related Documentation

- [ARCHITECTURE.md](../../ARCHITECTURE.md) - アーキテクチャ全体の説明
- [model/README.md](../model/README.md) - モデル層の説明
- [view/README.md](../view/README.md) - ビュー層の説明
