# change-case-lite

<!-- English | [中文简体](README.cn.md) -->

Lite package(`2.2 KiB` size packed) for change cases

## install

```bash
npm i change-case-lite
```

## Usage

```typescript
import { Case, camelCase } from "change-case-lite";

// first way.
Case("hello world").camelCase(); // => "helloWorld"

// second way
camelCase("hello world"); // => "helloWorld"
```

## Example

|                  Usage                   | Output String |
| :--------------------------------------: | ------------: |
|    Case("Hello, World!").camelCase();    |    helloWorld |
|   Case("Hello, World!").capitalCase();   |   Hello World |
|    Case("Hello, World!").cobolCase();    |   HELLO-WORLD |
|  Case("Hello, World!").constantCase();   |   HELLO_WORLD |
|     Case("Hello, World!").dotCase();     |   hello.world |
|    Case("Hello, World!").kebabCase();    |   hello-world |
|     Case("Hello, World!").noCase();      |   hello world |
|   Case("Hello, World!").pascalCase();    |    HelloWorld |
| Case("Hello, World!").pascalSnakeCase(); |   Hello_World |
|    Case("Hello, World!").pathCase();     |   hello/world |
|    Case("Hello, World!").snakeCase();    |   hello_world |
|    Case("Hello, World!").trainCase();    |   Hello-World |

For more examples, you can clone to local and install, run `npm run dev` and open browser to see more detail.

## With options

### options?.locales [`Intl.LocalesArgument;`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument)

If set, use `String.prototype.toLocaleLowerCase(options.locales)` instead of `String.prototype.toLowerCase()` and `String.prototype.toLocaleUpperCase(options.locales)` instead of `String.prototype.toUpperCase()`

example:

```typescript
expect(constantCase("adbii", { locales: "tr" })).toEqual("ADBİİ");
expect(constantCase("adbii", { locales: "de-DE" })).toEqual("ADBII");
```
