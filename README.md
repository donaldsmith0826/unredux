# Unredux

This repo features a number of realistic apps built without (frontend) frameworks. We use a dataflow
similar to CycleJS built on [React](https://facebook.github.io/react/) and [Kefir](https://kefirjs.github.io).

We weren't happy with architectures Redux, VueJS, MobX, GrapQL end up with, so we decided to
codify our own approach. Like CycleJS it's 100% reactive. Unlike CycleJS it doesn't attempt to
isolate side-effects in drivers (see our docs for more information).

We propose to start with Examples. If you like what you see – continue with Tutorials or Docs.

## Docs

* [Framework design comparison](./docs/frameworks.md)
* [Reactive or what](./docs/reactive-or-what.md)
* [RxJS &rarr; Kefir](./docs/) (Why and How -- TODO)

## Examples

#### [1. Counter](./examples/1.counter)

A basic example.

#### [2. Counters](./examples/2.counters)

Component isolation and reuse.

#### [3.1 Pages](./examples/3.1.pages)

Pages and simple routing.

#### [3.2 Router](./examples/3.2.router)

Advanced routing (**wip**).

#### [4. Todos](./examples/4.todos)

Classic "TodoMVC" app.

#### [5. Todos-History](./examples/5.todos-history)

Todos with a flexible history management.

#### [6. Shopping-Cart](./examples/6.shopping-cart)

Shopping Cart with interactions between "parent" and "child" apps.

#### [7.1 CRUD](./examples/7.1.crud)

CRUD client-server apps showing async data load, caching, SSR, and more.

#### [7.2 CRUD](./examples/7.2.crud)

Refactored version of the previous. Less boilerplate, more helpers.

## Tutorials

#### [1. State](./tutorials/1.state)

Getting started with reactive states.

#### [2. Store](./tutorials/2.store)

Let's make a better store abstraction.

#### [10. Logging](./tutorials/10.log)

Learn how to use logging middleware.

#### [11. Control](./tutorials/11.control)

*wip*

## Usage

Examples are expected to work in Browser and NodeJS environments. The latter will require `babel-node`
(because of ES6 modules).

```
$ npm install babel-cli -g
$ npm install http-server -g
```

#### Browser

1. Fork and download the repo.
2. `$ npm install` in the root to pull common dependencies.
3. `$ cd <example_folder>`.
4. `$ npm install` to pull local example dependencies and symlink vendor libraries (see below).
5. `$ npm start` (check `package.json` scripts).

#### NodeJS

1. Create some `.js` file in the project root.
2. In that file import from `./vendors/ramda`, `./vendors/rxjs` to get the same code as in Browser.
3. Run you file with `$ babel-node <scriptName.js>` instead of `$ node <scriptName.js>`.

### Prerequisites

* Functional Programming (basics)
* Lensing (basics)
* React (advanced)
* Kefir (advanced)

All code examples rely on `./vendors/ramda` and `./vendors/rxjs` custom tree-shaking bundles.
Webpack tree-shaking is [half-broken](https://github.com/scabbiaza/ramda-webpack-tree-shaking-examples)
and can be used only for production builds. In any case, custom imports (as annoying as they are),
result in much smaller bundles and faster dev. rebuilds.

I modify the `R` namespace there to simplify the reasoning (things become messy with 2+ helper sources).
This is a normal practice for applications (never do that in public libraries!).

## Remarks

### Conventions

We use ASCII [marble diagrams](http://rxmarbles.com/):

```
observable: ---v1---v2---> (time)
```

where `v1` may denote a string `"v1"` or something else, which should be clear from a context.

### Signal-to-noise ratio

I don't use linters. Having this:

```
"eslint": "^4.0.0",
"eslint-config-react-app": "^1.0.4",
"eslint-plugin-flowtype": "^2.29.2",
"eslint-plugin-import": "^2.2.0",
"eslint-plugin-jsx-a11y": "^5.0.3",
"eslint-plugin-react": "^7.1.0",
...
```

just to get "wrong indendation" events occasionally, is not what I live for. It's all about
**signal-to-noise** ratio, so I consider linters almost worthless (Flow is a better linter btw.).
For the same reason I don't use `const`, `===` and other "best practices" 2x year olds so like to
copy from their corporate gurus.
