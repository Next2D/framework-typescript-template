# Model

アプリケーションのドメインを隔離するためのディレクトリです。  
テンプレートのディレクトリ構成は一例であり、アプリケーションの機能性、保守性など、特性に合わせてモデリングを行ってください。

This directory is used to isolate the domain of the application.  
The directory structure of the template is an example and should be modeled according to the characteristics of the application, such as functionality and maintainability.  

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

このテンプレートの各ディレクトリの役割  
(テンプレートのディレクトリ構成は一例であり、アプリケーションの機能性、保守性など、特性に合わせてモデリングを行ってください。)  

The role of each directory in this template  
(The directory structure of the template is an example and should be modeled according to the characteristics of the application, such as functionality, maintainability, etc.)

### Application

```sh
application
└── content
```

`content`ディレクトリにはNoCode Toolで作成されたアニメーションを動的に生成するためのクラスが格納されてます。  
`service`ディレクトリを作成して、`domain`へのアクセスを行う責務を担う事も良いかもしれません。  

The `content` directory contains classes for dynamically generating animations created by the NoCode Tool.  
It may be a good idea to create a `service` directory to be responsible for accessing the `domain`.  

#### Example of cooperation with NoCode Tool

`namespace`にNoCode Toolのシンボルに設定した名前を追記する事で動的生成が可能になります。  
Dynamic generation is enabled by appending the name set for the NoCode Tool symbol in the `namespace` field.  

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
     */
    get namespace ()
    {
        return "TopContent"; // NoCode Toolのsymbolで設定した名前を追記
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

アプリケーションの固有ロジックを格納するディレクトリで、プロジェクトの核心になる層です。  
`callback`で、全画面の背景を生成、`event`ディレクトリは各ページのイベント処理を行っています。  
`event`ディレクトリのクラスがUserからの`InputUseCase`の責務を担っています。  

This directory stores the application-specific logic and is the core layer of the project.  
The `callback` generates the background for all screens, and the `event` directory handles events for each page.  
The classes in the `event` directory are responsible for `InputUseCase` from User.  

### Infrastructure

```sh
infrastructure
└── repository
```

外部へのアクセスロジックを格納するディレクトリです。  
データベースからの情報であれば`entity`ディレクトリを作成して可変可能オブジェクトとして  
可変想定がないオブジェクトなどはデータ転送オブジェクト(DTO)として`dto`ディレクトリにそれぞれ責務を分散させるのが良いかもしれません。  

A directory to store external access logic.  
If the information is from a database, create an `entity` directory as a variable object.  
For objects that have no variable assumptions, it may be a good idea to distribute their responsibilities in the `dto` directory as data transfer objects (DTOs).

### UI(User Interface)

```sh
ui
└── component
    ├── atom
    └── template
        ├── top
        └── home
```

アトミックデザインを意識したディレクトリ構成になってます。  
`atom`ディレクトリに最小の表示要素を作成して、`template`ディレクトリで各atomの要素を呼び出しページのレイアウトを作成してます。  
今回は`template`内のクラスが`UseCase`の責務も担っています。  
`application`ディレクトリへのアクセスは`template`内のクラスに制限する想定です。  

The directory structure is designed with atomic design in mind.  
The minimum display elements are created in the `atom` directory, and the elements of each atom are called in the `template` directory to create the layout of the page.  
In this case, the classes in the `template` directory are also responsible for `UseCase`.  
Access to the `application` directory is supposed to be restricted to the classes in the `template` directory.