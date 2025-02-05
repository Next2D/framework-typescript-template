# Configuration Files

各種設定ファイルを格納するディレクトリです。  
Directory for storing various configuration files.  

## stage.json

表示領域(Stage)の設定を行うJSONファイルです。  
JSON file for setting the display area.  

| name      | value   | default | description                                                                                          |
|-----------|---------|---------|------------------------------------------------------------------------------------------------------|
| `width`   | number  | 240     | 表示領域(Stage)の幅を設定します。 <br> This is the setting for the width of the display area.                     |
| `height`  | number  | 240     | 表示領域(Stage)の高さを設定します。 <br> This is the setting for the height of the display area.                   |
| `fps`     | number  | 12      | 1秒間に何回描画するかを指定します。1から60の数値の設定が可能です。 <br> The number of drawings per second can be set from 1 to 60.  |
| `options` | object  | {}      | オプション設定 <br> Option Setting                                                                          |

### Stage Option settings

| name         | value    | default        | description                                                                                                                                                                                                              |
|--------------|----------|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `fullScreen` | boolean  | true           | Stageクラスで設定した幅と高さを超えて画面全体に描画されます。 <br> It will be drawn on the entire screen beyond the width and height set in the Stage class.                                                                                         |
| `tagId`      | string   | null           | IDを指定すると、指定したIDのエレメント内で描画を行います。 <br> When an ID is specified, drawing will be performed within the element with the specified ID.                                                                                        |
| `bgColor`    | string   | "transparent"  | 背景色を16進数で指定できます。デフォルトは無色透明です。 <br> You can specify a background color in hexadecimal. The default is colorless.                                                                                                          |

## config.json

初期は`local`、`dev`、`stg`、`prd`、`all`、と区切られており、`all`以外は任意の環境名です。  
開発環境に合わせて変更、もしくは追加が可能です。  
リリースするプラットフォーム毎にAPIのエンドポイントが異なるなど、環境変数として利用が可能です。  

Initially, the names are separated as `local`, `dev`, `stg`, `prd`, `all`, and any environment name except for `all`.  
You can change or add to them according to your development environment.  
It can be used as an environment variable, for example, for different API endpoints for each platform to be released.

### config.json > all

`all`はその名の通り、どの環境でも書き出される共通変数となります。  
`all`で機能に影響のある設定項目は以下の項目となります。  

As the name suggests, `all` is a common variable that is written out in any environment.  
The following items are available in `all` that affect functionality.  

| name                | value           | default                 | description                                                                                                                                                                                                                                                             |
|---------------------|-----------------|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `defaultTop` | string | "top" | ページトップ(index)のViewを指定、設定がない場合はTopViewクラスが起動します。 <br> Specifies the view at the top of the page (index); if not set, the TopView class is invoked. |
| `spa`               | boolean         | true                    | Single Page Applicationとして、URLでシーンを制御することができます。 <br> As a Single Page Application, scenes can be controlled by URL.                                                                                                                                                     |
| `loading.callback`  | string          | Loading                 | 画面遷移の準備が完了するまでの間、ローディング画面を表示するかどうかを設定します。コールバックとして設定されたクラスのstart関数とend関数を呼び出します。 <br> Sets whether or not the loading screen is displayed until the preparation for screen transition is completed. Calls the start and end functions of the class set as the callback. |
| `gotoView.callback` | string or array | ["callback.Background"] | gotoView関数が終了した後にコールバックするクラスを指定できます。 <br> You can specify the class to be called back after the gotoView function exits.                                                                                                                                                |

### config.json > platform

`platform`の値は書き出し時に自動で生成されます。  
値は、`macos`、`windows`、`ios`、`android`、`web`の固定値となります。  
プラットフォーム固有の判定などで利用が可能です。  

The `platform` value is automatically generated when exporting.  
The values are fixed values for `macos`, `windows`, `ios`, `android`, and `web`.  
It can be used for platform-specific judgments, etc.  

## routing.json

ルーティングに設定できるトッププロパティは、英数字、スラッシュです。  
スラッシュをキーにCamelCaseでViewクラスにアクセスします。  

The top properties that can be set for routing are alphanumeric characters and slashes.  
The slash is used as a key to access the View class in CamelCase.

### Example

下記のサンプルの場合は、`https://example.com/quest/list` でアクセスが可能になり  
ContextにQuestListViewクラスがセットされます。  

In the case of the sample below, access is enabled at `https://example.com/quest/list` and the  
Context is set to the QuestListView class.  

```json
{
    "quest/list": {
        "requests": []
    }
}
```

## Second level property settings

| name        | value    | default | description                                                                                                                                                                                                               |
|-------------|----------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `private`   | boolean  | false   | SPAモードでも直接のアクセスを制御した時に利用します。trueに設定し直接アクセスすると、TopViewが読み込まれます。 <br> This is used when direct access is controlled even in SPA mode; if set to true and direct access is made, TopView will be loaded.                     |
| `requests`  | array    | null    | Viewにアクセスする前に、指定した先にリクエストを送信します。受け取った情報は、nameをキーに`response`にセットされます。 <br> Before accessing the View, a request is sent to the specified destination. The information received is set in `response` with name as the key.  |


### routing.json > requests

requests配列の設定は以下の項目が利用可能です。  

The following items are available for setting up the requests array  

| name       | value           | default  | description                                                                                                                                                                                                                                                                          |
|------------|-----------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`     | string          | content  | `json`、`content`、`custom`の固定値が利用可能です。 <br> Fixed values for `json`, `content`, and `custom` are available.                                                                                                                                                                           |
| `path`     | string          | empty    | `{{***}}`で囲むと、`config.json`の変数を取得できます。例）{{ api.endPoint }}path/to/api <br> Enclose the variables in `{{***}}` to get the variables in `config.json`. Example: {{ api.endPoint }}path/to/api                                                                                          |
| `name`     | string          | empty    | `name`を設定すると、設定した値をキーとして`response`にセットされます。画面遷移すると前の画面で取得した`response`データは初期化されます。 <br> When `name` is set, the set value is set to `response` as a key. When the screen transitions, the `response` data acquired on the previous screen is initialized.                             |
| `cache`    | boolean         | false    | `name`で設定した値をキーにして、取得したデータをキャッシュします。キャッシュしたデータは画面遷移しても初期化される事はありません。 <br> Cache the retrieved data using the value set in `name` as a key. Cached data will not be initialized after a screen transition.                                                                            |
| `callback` | string or array | null     | リクエスト完了後にコールバックするクラスを指定することができます。コントラクターを起動後、取得した値を第一引数にセットし、`execute`関数がコールされます。 <br> You can specify a class to be called back after the request is completed. After invoking the contractor, the `execute` function is called with the retrieved value set as the first argument. |
| `class`    | string          | empty    | リクエストを実行するクラスを指定することができます。(typeがcustomのときのみ呼び出されます。） <br> You can specify a class to execute the request. (This is only called when type is custom.)                                                                                                                                 |
| `access`   | string          | public   | リクエストを実行する関数へのアクセスを指定できます。`public`あるいは`static`を指定することができます。(typeがcustomのときのみ呼び出されます）<br> You can specify access to the function that will execute the request, which can be `public` or `static`. (Only called if type is custom.)                                                   |
| `method`   | string          | empty    | リクエストを実行する関数名を指定することができます。(typeがcustomのときのみ起動します）。 <br> You can specify the name of the function that will execute the request. (It will be invoked only when type is custom).                                                                                                       |
