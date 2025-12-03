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

`content` ディレクトリにはAnimation Toolで作成された `DisplayObject` を動的に生成するためのクラスが格納されてます。`usecase` ディレクトリを作成して、ビジネスロジックを実装し、`domain` へのアクセスを行う責務を担います。  

The `content` directory contains classes for dynamically generating `DisplayObject`s created by the Animation Tool. The `usecase` directory is created to implement business logic and handle the responsibility of accessing the `domain`.

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

アプリケーションの固有ロジックを格納するディレクトリで、プロジェクトの核心になる層です。このテンプレートでは `callback` で、背景に全画面のグラデーション描画を行なっています。ドメインロジックは外部の詳細実装に依存せず、インターフェースを通じて抽象化された依存関係を持つべきです。  

This directory stores the application-specific logic and is the core layer of the project. The `callback` generates the background for all screens. Domain logic should not depend on external implementation details and should have dependencies abstracted through interfaces.  

### Infrastructure

```sh
infrastructure
└── repository
```

外部へのアクセスロジックを格納するディレクトリです。データベースからの情報であれば `entity` ディレクトリを作成して可変可能オブジェクトとして運用し、可変想定がないオブジェクトなどはデータ転送オブジェクト(DTO)として `dto` ディレクトリにそれぞれ責務を分散させるのが良いかもしれません。Repositoryは具体的な実装であり、ドメイン層からはインターフェースを通じてアクセスされるべきです。  

This directory stores logic for external access. For data retrieved from a database, you might consider creating an `entity` directory to manage mutable objects, while objects that are not meant to change can have their responsibilities distributed into a `dto` directory as data transfer objects (DTOs). Repositories are concrete implementations and should be accessed from the domain layer through interfaces.

### UI(User Interface)

このテンプレートでは、UIコンポーネントは `src/ui` ディレクトリに配置されており、`model/ui` ではありません。  

In this template, UI components are located in the `src/ui` directory, not in `model/ui`.

## UI Components

```sh
ui
└── component
    ├── atom
    └── molecule
```

アトミックデザインを意識したディレクトリ構成になってます。`atom` ディレクトリに最小の表示要素を作成して、`molecule` ディレクトリで各atomの要素を組み合わせたコンポーネントを作成します。UIコンポーネントはインターフェースを実装することで、ビジネスロジック層から抽象化された形で扱われます。  

The directory structure is designed with atomic design in mind. Minimal display elements are created in the `atom` directory, and in the `molecule` directory, components are created by combining atom elements. UI components implement interfaces to be handled in an abstracted manner from the business logic layer.