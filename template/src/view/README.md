# View and ViewModel

1画面にViewとViewModelがワンセット作成するのが基本スタイルです。ディレクトリ構成はキャメルケースの最初のブロックで作成するのを推奨しています。  

The basic style is to create one set of View and ViewModel per screen. It is recommended that the directory structure be created using the first block of camelCase.  

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

複数のViewクラス/ViewModelクラスを生成する際は、以下のコマンドで自動生成する事をお勧めします。  
このコマンドはrouting.jsonのトッププロパティの値を分解し、viewディレクトリ直下に対象のディレクトリがなければディレクトリを作成し、ViewとViewModelが存在しない場合のみ新規でクラスを生成します。  

When generating multiple View/ViewModel classes, it is recommended to use the following command to generate them automatically.  
This command breaks down the values of the top properties in routing.json, creates the directories directly under the view directory if they do not exist, and generates new classes only if the View and ViewModel classes do not exist.

```sh
npm run generate
```

## View Class
メインコンテキストにアタッチされるコンテナの役割を担うのがViewクラスです。  
その為、記述は至ってシンプルで、routing.jsonで設定した値のキャメルケースでファイルを作成し、`View`クラスを継承するのが基本のスタイルです。  
特殊な要件がない限り、Viewでロジックを組む事はありません。  
  
The View class plays the role of a container attached to the main context.  
Therefore, the description is quite simple. The basic style is to create a file with a camelCase of values set in routing.json and inherit from the `View` class.  
Unless there are special requirements, we do not build logic in View.  
  
### View class source

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
表示の開始時にbind関数がコールされ、画面遷移する前に終了処理としてunbind関数がコールされます。  
Viewに任意のDisplayObjectをbindするのが、ViewModelの役割です。  
ViewModelは、model/ui/component/template/{{page}}/*.jsへのアクセスのみ許可するのを推奨しています。

The bind function is called at the start of the display, and the unbind function is called as the end process before the screen transition.  
The role of the ViewModel is to bind an arbitrary DisplayObject to the View.  
It is recommended that the ViewModel only allow access to model/ui/component/template/{{page}}/*.js.  

### ViewModel class source

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
     * @return {Promise}
     * @method
     * @public
     */
    bind (view)
    {
        return this
            .factory(view)
            .then((view) =>
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
            });
    }

    /**
     * @param  {View} view
     * @return {void}
     * @method
     * @public
     */
    unbind (view)
    {
        // unbind関数を利用しなければ削除
        // Delete if unbind function is not used
    }
}
```
