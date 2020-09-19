# react-input-verification-code

A verification code input, autocompletion friendly

[![NPM](https://img.shields.io/npm/v/react-input-verification-code.svg)](https://www.npmjs.com/package/react-input-verification-code) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features

- Support native autocompletion when receiving a code via SMS
- Support pasted string (when number)

## Examples

- Basic
  - [CodeSandbox](https://codesandbox.io/s/basic-6ejdp)
  - [Source](https://github.com/ugogo/react-input-verification-code/tree/master/examples/basic/src/index.tsx)
- Controllable
  - [CodeSandbox](https://codesandbox.io/s/controllable-32dfy)
  - [Source](https://github.com/ugogo/react-input-verification-code/tree/master/examples/controllable/src/index.tsx)
- Custom Styles
  - [CodeSandbox](https://codesandbox.io/s/custom-styles-bw8s4)
  - [Source](https://github.com/ugogo/react-input-verification-code/tree/master/examples/custom-styles/src/index.tsx)

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

export default function App() {
  return <ReactInputVerificationCode />;
}
```

## API

### Props

| Key         | Type       | Default | Required | Description                                               |
| ----------- | ---------- | ------- | -------- | --------------------------------------------------------- |
| length      | `number`   | `4`     | false    | How many items will be rendered                           |
| onChange    | `function` |         | true     | Function called when the value changes                    |
| placeholder | `string`   | `·`     | false    | String rendered in each item when no value has been typed |
| value       | `string`   |         | false    | Control internal input value                              |

### CSS Properties

The following CSS properties are set globally so you can easily override them to fit your needs

| Key                                        | Default  | Description             |
| ------------------------------------------ | -------- | ----------------------- |
| `--ReactInputVerificationCode-itemWidth`   | `4.5rem` | Width of an item        |
| `--ReactInputVerificationCode-itemHeight`  | `5rem`   | Height of an item       |
| `--ReactInputVerificationCode-itemSpacing` | `1rem`   | Space between two items |

## License

MIT © [ugogo](https://github.com/ugogo)
