# react-input-verification-code

A verification code input, autocompletion friendly

[![NPM](https://img.shields.io/npm/v/react-input-verification-code.svg)](https://www.npmjs.com/package/react-input-verification-code) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Examples

- Basic - [CodeSandbox](https://codesandbox.io/s/basic-6ejdp) - [Source](https://github.com/ugogo/react-input-verification-code/tree/master/example/src/Basic.tsx)

## Install

```bash
npm install --save react-input-verification-code
```

```bash
yarn add react-input-verification-code
```

## Usage

```tsx
import * as React from 'react';
import ReactInputVerificationCode from 'react-input-verification-code';
import 'react-input-verification-code/dist/index.css';

export default function App() {
  return <ReactInputVerificationCode />;
}
```

## API

| Key         | Type      | Default | Description                     |
| ----------- | --------- | ------- | ------------------------------- |
| length      | `number`  | `4`     | How many items will be rendered |
| placeholder | `Element` | `·`     | Element rendered when no value  |

## License

MIT © [ugogo](https://github.com/ugogo)
