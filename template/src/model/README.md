# Model

アプリケーションのドメインを隔離するためのディレクトリです。このディレクトリ構成は一例であり、アプリケーションの機能性、保守性など、特性に合わせてモデリングを行ってください。  

This directory is used to isolate the domain of the application. The directory structure provided is just one example; please model it according to the specific characteristics of your application, such as its functionality and maintainability.  

## Example of directory structure

```sh
project
└── src
    └── model
        ├── application
        │   └── content
        ├── domain
        │   ├── callback
        │   └── event
        │       ├── top
        │       └── home
        ├── infrastructure
        │   └── repository
        └── ui
            └── component
                ├── atom
                └── template
                    ├── top
                    └── home
```

各ディレクトリの役割を記載していきます。  
(このディレクトリ構成は一例であり、アプリケーションの機能性、保守性など、特性に合わせてモデリングを行ってください。)  

We will describe the role of each directory.  
(This directory structure is just an example; please model it according to the specific characteristics of your application, such as its functionality and maintainability.)

### Application

```sh
application
└── content
```

`content` ディレクトリにはAnimation Toolで作成された `DisplayObject` を動的に生成するためのクラスが格納されてます。動的に生成された `DisplayObject` は起動時に `initialize` 関数が実行されます。 `service`、 `usecase`  ディレクトリを作成して、`domain` へのアクセスを行う責務を担う事も良いかもしれません。  

The `content` directory contains classes for dynamically generating `DisplayObject`s created by the Animation Tool. Dynamically generated `DisplayObject`s execute their `initialize` function upon startup. It might also be a good idea to create `service` and `usecase` directories to handle the responsibility of accessing the `domain`.

#### Example of cooperation with Animation Tool

`namespace` にAnimation Toolのシンボルに設定した名前を追記する事で動的生成が可能になります。  
Dynamic generation is enabled by appending the name set for the Animation Tool symbol in the `namespace` field.  

```javascript
import { MovieClipContent } from "@next2d/framework";

/**
 * @see file/sample.n2d
 * @class
 * @extends {MovieClipContent}
 */
export class TopContent extends MovieClipContent
{
    /**
     * @return {string}
     * @readonly
     * @public
     */
    get namespace ()
    {
        // Animation Toolのsymbolで設定した名前を追記
        // Append the name assigned to the Animation Tool symbol.
        return "TopContent"; 
    }
}
```

### Domain

```sh
domain
├── callback
└── event
    ├── top
    └── home
```

アプリケーションの固有ロジックを格納するディレクトリで、プロジェクトの核心になる層です。このテンプレートでは `callback` で、背景に全画面のグラデーション描画を行なっています。 `event` ディレクトリは各ページのイベント処理関数が管理されています。 `event` ディレクトリのクラスがユーザーからの `InputUseCase` の責務を担っています。  

This directory stores the application-specific logic and is the core layer of the project.  
The `callback` generates the background for all screens, and the `event` directory handles events for each page.  
The classes in the `event` directory are responsible for `InputUseCase` from User.  

### Infrastructure

```sh
infrastructure
└── repository
```

外部へのアクセスロジックを格納するディレクトリです。データベースからの情報であれば `entity` ディレクトリを作成して可変可能オブジェクトとして運用し、可変想定がないオブジェクトなどはデータ転送オブジェクト(DTO)として `dto` ディレクトリにそれぞれ責務を分散させるのが良いかもしれません。  

This directory stores logic for external access. For data retrieved from a database, you might consider creating an `entity` directory to manage mutable objects, while objects that are not meant to change can have their responsibilities distributed into a `dto` directory as data transfer objects (DTOs).

### UI(User Interface)

```sh
ui
└── component
    ├── atom
    └── template
        ├── top
        └── home
```

アトミックデザインを意識したディレクトリ構成になってます。`atom` ディレクトリに最小の表示要素を作成して、`template` ディレクトリで各atomの要素を呼び出しページのレイアウトを作成してます。今回は `template` 内のクラスが `UseCase` の責務も担っています。`application` ディレクトリへのアクセスは `template` 内のクラスに制限する想定です。  

The directory structure is designed with atomic design in mind. Minimal display elements are created in the `atom` directory, and in the `template` directory, these atom elements are assembled to build the page layout. In this case, the classes in the `template` directory also carry the responsibilities of the `UseCase`. Access to the `application` directory is intended to be restricted to classes within the `template` directory.