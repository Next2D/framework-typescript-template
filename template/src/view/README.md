# View and ViewModel

1画面にViewとViewModelをワンセット作成するのが基本スタイルです。ディレクトリ構成はキャメルケースの最初のブロックで作成するのを推奨しています。  

The basic style is to create one set of View and ViewModel per screen. It is recommended that the directory structure be organized using the first segment in camelCase. 

## Example of directory structure

```sh
project
└── src
    └── view
        ├── top
        │   ├── TopView.js
        │   └── TopViewModel.js
        └── home
            ├── HomeView.js
            └── HomeViewModel.js
```

## Generator

複数のViewクラス、及び、ViewModelクラスを生成する際は、以下のコマンドで自動生成する事をお勧めします。このコマンドは `routing.json` のトッププロパティの値を分解し、`view` ディレクトリ直下に対象のディレクトリがなければディレクトリを作成し、ViewとViewModelが存在しない場合のみ新規でクラスを生成します。  

When generating multiple View and ViewModel classes, it is recommended to use the following command for auto-generation. This command parses the top-level property values in `routing.json`, creates the target directories under the `view` directory if they do not exist, and generates new classes only if the corresponding View and ViewModel classes are missing.  

```sh
npm run generate
```

## View Class
メインコンテキストにアタッチされるコンテナです。その為、記述は至ってシンプルで、 `routing.json` で設定した値のキャメルケースでファイルを作成し、Viewクラスを継承するのが基本のスタイルです。起動時に `initialize` 関数がコールされます。ですが、特殊な要件がない限り、Viewでロジックを組む事はありません。  
  
It is a container attached to the main context. Therefore, its implementation is kept very simple: files are created using the camelCase version of the values specified in `routing.json`, and the basic style is to extend the View class. The `initialize` function is called at startup; however, unless there are special requirements, no logic should be implemented in the View.
  
### Example of View class source

```javascript
import { View } from "@next2d/framework";

export class TopView extends View
{
    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        super();
    }
}
```

## ViewModel Class
画面遷移するタイミングで終了処理として `unbind` 関数がコールされ、表示の開始時に `bind` 関数がコールされます。Viewに任意のDisplayObjectをbindするのが、ViewModelの役割です。今回のテンプレートでは、ViewModelは `model/ui/component/template/{{page}}/*.[ts|js]` のアクセスのみ許可するスタイルで作成しています。

During screen transitions, the `unbind` function is called as part of the cleanup process, and the `bind` function is called when the display starts. The role of the ViewModel is to bind an arbitrary DisplayObject to the View. In this template, the ViewModel is designed to only allow access to files in `model/ui/component/template/{{page}}/*.[ts|js]`.  

### Example of ViewModel class source

```javascript
import { ViewModel } from "@next2d/framework";
import { TopContentTemplate } from "@/model/ui/component/template/top/TopContentTemplate";
import { TopButtonTemplate } from "@/model/ui/component/template/top/TopButtonTemplate";

/**
 * @class
 * @extends {ViewModel}
 */
export class TopViewModel extends ViewModel
{
    /**
     * @param  {View} view
     * @return {Promise<void>}
     * @method
     * @public
     */
    async bind (view)
    {
        /**
         * ロゴアニメーションをAnimation ToolのJSONから生成
         * Logo animation generated from Animation Tool's JSON
         */
        const topContent = new TopContentTemplate().factory();
        view.addChild(topContent);

        /**
         * ボタンエリアを生成
         * Generate button area
         */
        const button = new TopButtonTemplate().factory(topContent);
        view.addChild(button);
    }

    /**
     * @param  {View} view
     * @return {Promise<View>}
     * @method
     * @public
     */
    unbind (view)
    {
        /**
         * unbind関数を利用しなければ削除
         * Delete if unbind function is not used
         */
        return super.unbind(view);
    }
}
```
