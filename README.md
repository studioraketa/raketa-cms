## Install

```
yarn add raketa-ui
```

## Development

In a terminal session from the project's directory run:
- yarn
- yarn dev

In another terminal session in the project's directory run:
- yarn link

In a terminal for a project using this npm package run the following command:
- yarn link "@raketa-cms/raketa-cms"
- yarn install

Note when you want to stop using the local package:
- yarn unlink "@raketa-cms/raketa-cms"
- yarn install

## Build and publish

1. yarn build
2. Remove this.refs.editor.focus() from dist/bundle.js
3. yarn publish

## Usage

TODO: Add documentation
