# react-input-verification-code

A verification code input, mobile autocompletion friendly

[![NPM](https://img.shields.io/npm/v/react-input-verification-code.svg)](https://www.npmjs.com/package/react-input-verification-code) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features

- Support native autocompletion when receiving a code via SMS
- Support pasted string

## Examples

- [Basic](https://codesandbox.io/s/basic-6ejdp)
- [Controllable](https://codesandbox.io/s/controllable-32dfy)
- [Custom Styles](https://codesandbox.io/s/custom-styles-bw8s4)

## peerDependencies

```
{
  "react": ">=16.0.0",
  "react-dom": ">=16.0.0"
}
```

## Install

```bash
yarn add react-input-verification-code
```

## Usage

```tsx
import React from 'react';
import ReactInputVerificationCode, {
  ReactInputVerificationCodeProps,
} from 'react-input-verification-code';

const customProps: ReactInputVerificationCodeProps = {
  autoFocus: true,
};

export default function App() {
  return <ReactInputVerificationCode {...customProps} />;
}
```

## API

### Props

| Key         | Type                     | Default      | Required | Description                                        |
| ----------- | ------------------------ | ------------ | -------- | -------------------------------------------------- |
| autoFocus   | `boolean`                | false        | false    | Should focus on first render                       |
| length      | `number`                 | `4`          | false    | How many inputs will be rendered                   |
| onChange    | `function`               | `() => null` | false    | Function called when the value changes             |
| onCompleted | `function`               | `() => null` | false    | Function called when the value is completed        |
| placeholder | `string`                 | `·`          | false    | Inputs placeholder                                 |
| value       | `string`                 | `""`         | false    | Default value                                      |
| type        | `'alphanumeric, number'` | `number`     | false    | Should accepts alphanumeric values or only numbers |

### Custom Styles

Simply override the styles using the following classnames

```css
.ReactInputVerificationCode-container {}
.ReactInputVerificationCode-item {}
```

## License

MIT © [ugogo](https://github.com/ugogo)
