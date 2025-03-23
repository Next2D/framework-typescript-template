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
| `fps`     | number  | 60      | 1秒間に何回描画するかを指定します。1から60の数値の設定が可能です。 <br> The number of drawings per second can be set from 1 to 60.  |
| `options` | object  | null    | オプション設定 <br> Option Setting                                                                          |

### Stage Option settings

| name         | value    | default        | description                                                                                                                                                                                                              |
|--------------|----------|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `fullScreen` | boolean  | false          | Stageクラスで設定した幅と高さを超えて画面全体に描画されます。 <br> It will be drawn on the entire screen beyond the width and height set in the Stage class.                                                                                         |
| `tagId`      | string   | null           | IDを指定すると、指定したIDのエレメント内で描画を行います。 <br> When an ID is specified, drawing will be performed within the element with the specified ID.                                                                                        |
| `bgColor`    | string   | "transparent"  | 背景色を16進数で指定できます。デフォルトは無色透明です。 <br> You can specify a background color in hexadecimal. The default is colorless.                                                                                                          |

## config.json

初期は `local`、`dev`、`stg`、`prd`、`all`、と区切られており、`all` 以外は任意の環境名です。環境に依存する設定（例：APIエンドポイント、ログ出力レベル、キャッシュの設定など）を分離することで、開発中と本番運用時とで異なる挙動を実現できます。また、全ての設定値が一箇所にまとまっているため、管理やメンテナンスが容易になります。新たなパラメータの追加や既存の設定変更も、該当箇所を探しやすくなります。 

Initially, the configuration is divided into `local`, `dev`, `stg`, `prd`, and `all`, where any environment name is allowed except for `all`.  
By segregating environment-specific settings (for example, API endpoints, log output levels, cache configurations, etc.), you can achieve different behaviors between development and production. Additionally, since all configuration values are consolidated in one place, management and maintenance become easier, and it simplifies locating the relevant sections when adding new parameters or modifying existing settings.

### config.json > all

`all` はその名の通り、どの環境でも書き出される共通変数となります。`all` で機能に影響のある設定項目は以下の項目となります。  

As the name suggests, `all` is a common variable that is written out in any environment. The following items are available in `all` that affect functionality.  

| name                | value           | default                 | description                                                                                                                                                                                                                                                             |
|---------------------|-----------------|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `defaultTop` | string | "top" | ページトップ(index)のViewを指定、設定がない場合はTopViewクラスが起動します。 <br> Specifies the view at the top of the page (index); if not set, the TopView class is invoked. |
| `spa`               | boolean         | true                    | Single Page Applicationとして、URLでシーンを制御することができます。 <br> As a Single Page Application, scenes can be controlled by URL.                                                                                                                                                     |
| `loading.callback`  | string          | Loading                 | 画面遷移の準備が完了するまでの間、ローディング画面を表示するかどうかを設定します。コールバックとして設定されたクラスのstart関数とend関数を呼び出します。 <br> Sets whether or not the loading screen is displayed until the preparation for screen transition is completed. Calls the start and end functions of the class set as the callback. |
| `gotoView.callback` | string or array | ["callback.Background"] | gotoView関数が完了した後、コールバック用のクラスを指定できます。配列で複数のクラスを設定することができ、各クラスのexecute関数がasync/awaitを利用した非同期処理で呼び出されます。<br> After the gotoView function completes, you can specify one or more callback classes. These classes can be provided as an array, and the execute function of each class is invoked asynchronously using async/await.                                                                                                                                                |

### config.json > platform

`platform` の値は書き出し時の `--platform` で指定した値がセットされます。値は、`macos`、`windows`、`linux`、`ios`、`android`、`web` が対応しています。プラットフォーム固有の判定などで利用が可能です。  

The `platform` value is assigned based on the value specified with `--platform` at export time. The accepted values are `macos`, `windows`, `linux`, `ios`, `android`, and `web`. It can be used for platform-specific determinations.

## routing.json

ルーティングに設定できるトッププロパティは、英数字、スラッシュです。スラッシュをキーにCamelCaseでViewクラスにアクセスします。  

The top properties that can be set for routing are alphanumeric characters and slashes. The slash is used as a key to access the View class in CamelCase.

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
| `private`   | boolean  | false   | URLでの直接的なアクセスを制御したい時に利用します。trueに設定した場合、URLでアクセスすると、TopViewが読み込まれます。 <br> This is used to control direct URL access. If set to true, accessing the URL will load the TopView.                     |
| `requests`  | array    | null    | Viewがbindされる前に、指定したアクセス先にリクエストを送信します。受け取った情報は、nameをキーに `response` にセットされます。`response`  は `app.getResponse()` で取得できます。 Example: `app.getResponse().get("key")` <br> Before the View is bound, a request is sent to the specified endpoint. The received data is stored in `response` using the given name as the key, and you can retrieve `response` with `app.getResponse()`. Example: `app.getResponse().get("key")`  |


### routing.json > requests

requests配列の設定は以下の項目が利用可能です。  

The following items are available for setting up the requests array  

| name       | value           | default  | description                                                                                                                                                                                                                                                                          |
|------------|-----------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`     | string          | content  | `json`、`content`、`custom` の固定値が利用可能です。 <br> Fixed values for `json`, `content`, and `custom` are available.                                                                                                                                                                           |
| `path`     | string          | empty    | `{{***}}` で囲むと `config.json` の変数を取得できます。Example: {{ api.endPoint }}path/to/api <br> Enclose the variables in `{{***}}` to get the variables in `config.json`. Example: {{ api.endPoint }}path/to/api                                                                                          |
| `name`     | string          | empty    | `name` を設定すると、設定した値をキーとして `response` にセットされます。画面遷移すると前の画面で取得した `response` データは初期化されます。 <br> When `name` is set, the set value is set to `response` as a key. When the screen transitions, the `response` data acquired on the previous screen is initialized.                             |
| `cache`    | boolean         | false    | `name` で設定した値をキーにして、取得したデータをキャッシュします。キャッシュしたデータは画面遷移しても初期化される事はありません。 `cache` は `app.getCache()` で取得できます。 Example: `app.getCache().get("key")` <br> The data retrieved is cached using the value set in `name` as the key. The cached data persists through screen transitions and is not reset. You can access the cache using `app.getCache()`. Example: `app.getCache().get("key")`                                                                            |
| `callback` | string or array | null     | リクエスト完了後にコールバックするクラスを指定することができます。コントラクターを起動後、取得した値を第一引数にセットし、`execute` 関数がコールされます。配列で複数のクラスを設定することができ、各クラスのexecute関数がasync/awaitを利用した非同期処理で呼び出されます。 <br> After the request is completed, you can specify a callback class. Once the constructor is invoked, the retrieved value is set as the first argument and the `execute` function is called. You can also specify multiple classes as an array, and the `execute` function of each class is invoked asynchronously using async/await. |
| `class`    | string          | empty    | リクエストを実行するクラスを指定することができます。(typeがcustomのときのみ呼び出されます。） <br> You can specify a class to execute the request. (This is only called when type is custom.)                                                                                                                                 |
| `access`   | string          | public   | リクエストを実行する関数へのアクセスを指定できます。`public` あるいは `static` を指定することができます。(typeがcustomのときのみ呼び出されます）<br> You can specify access to the function that will execute the request, which can be `public` or `static`. (Only called if type is custom.)                                                   |
| `method`   | string          | empty    | リクエストを実行する関数名を指定することができます。(typeがcustomのときのみ起動します）。 <br> You can specify the name of the function that will execute the request. (It will be invoked only when type is custom).                                                                                                       |
