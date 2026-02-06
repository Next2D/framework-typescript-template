# Interface Definitions

TypeScriptインターフェース定義。Clean Architecture原則に従い、各層の依存関係を抽象化。

## Rules

- 命名規則: `I` プレフィックスを使用 (例: `IDraggable`, `ITextField`)
- 必要最小限のプロパティのみ定義
- `any`型を禁止、常に明示的な型を使用
- JSDocコメントを追加

## Interface Categories

### 1. UI関連 (コンポーネントの振る舞い)

```typescript
// IDraggable.ts - ドラッグ可能なオブジェクト
export interface IDraggable {
    startDrag(): void;
    stopDrag(): void;
}
// 使用: HomeBtnMolecule, HomeContent

// ITextField.ts - テキストフィールドの基本プロパティ
export interface ITextField {
    width: number;
    x: number;
}
// 使用: TextAtom, CenterTextFieldUseCase

// ITextFieldProps.ts - テキストフィールドの詳細プロパティ設定
// 使用: TextAtomのコンストラクタ

// ITextFieldType.ts - テキストフィールドタイプ
// ITextFieldAutoSize.ts - テキストフィールドオートサイズ
// ITextFormatAlign.ts - テキストフォーマットアライン
// ITextFormatObject.ts - テキストフォーマットスタイル設定
```

### 2. データ転送オブジェクト (DTO)

```typescript
// IHomeTextResponse.ts - APIレスポンス型
export interface IHomeTextResponse {
    word: string;
}
// 使用: HomeTextRepository.get()の戻り値型
```

### 3. 画面遷移関連

```typescript
// IViewName.ts - 利用可能な画面名 (Union型)
export type ViewName = "top" | "home";
// 使用: NavigateToViewUseCase
// 新画面追加時はこの型にも追加が必要
```

### 4. 設定関連

- `IConfig.ts` - アプリケーション全体設定
- `IStage.ts` - ステージ設定 (`stage.json`の型)
- `IRouting.ts` - ルーティング設定
- `IGotoView.ts` - 画面遷移オプション
- `IRequest.ts` / `IRequestType.ts` - HTTPリクエスト設定
- `IOptions.ts` - オプション設定

## Interface Template

```typescript
/**
 * @description [インターフェースの説明]
 *              [Interface description]
 *
 * @interface
 */
export interface IYourInterface
{
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

## Best Practices

```typescript
// OK: 必要最小限
export interface ITextField {
    width: number;
    x: number;
}

// NG: 不要なプロパティ
export interface ITextField {
    width: number;
    height: number;  // 使用しない
    x: number;
    y: number;       // 使用しない
}

// OK: 型の再利用
export interface IPosition { x: number; y: number; }
export interface ITextField extends IPosition { width: number; }

// OK: 明示的型
export interface IHomeTextResponse { word: string; }

// NG: any型
export interface IHomeTextResponse { word: any; }
```

## Adding New Interface Steps

1. 目的を明確にする（どの層の依存を抽象化するか）
2. `I`プレフィックスの命名規則に従う
3. 必要最小限のプロパティ/メソッドのみ定義
4. JSDocコメントを追加
5. 使用箇所を明記
