import React, {
  ChangeEvent,
  forwardRef,
  KeyboardEvent,
  RefObject,
} from 'react';
import { useInputVerificationCode } from './context';

import './index.css';

interface InputProps {
  index?: number;
  isLast?: boolean;
  value?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ index, isLast, value }, ref) => {
    const {
      focusInput,
      handleValuesChange,
      selectInputContent,
      setInputValue,
      validate,
    } = useInputVerificationCode();

    // passed by the context
    if (
      handleValuesChange === undefined ||
      index === undefined ||
      isLast === undefined ||
      value === undefined
    ) {
      return null;
    }

    const blurInput = () => {
      const input = (ref as RefObject<HTMLInputElement>).current;

      if (input) {
        input.blur();
      }
    };

    const onInputFocus = () => {
      selectInputContent(index);
    };

    const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      const eventKey = event.key;

      console.log({ event, eventKey, index });

      /**
       * handle "delete and go back" events
       */
      if (eventKey === 'Backspace' || eventKey === 'Delete') {
        setInputValue('', index);
        focusInput(index - 1);

        return;
      }

      /**
       * if the eventKey is not valid, don't go any further
       * and select the content of the input for a better UX
       */
      if (!validate(eventKey)) {
        selectInputContent(index);
        return;
      }

      setInputValue(eventKey, index);

      /**
       * if the input is the last of the list
       * blur it, otherwise focus the next one
       */
      if (isLast) {
        blurInput();
        return;
      }

      focusInput(index + 1);
    };

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const eventValue = event.target.value;

      console.log('onInputChange', { event, eventValue });

      /**
       * handle OTP and pasted codes
       */
      if (eventValue.length > 1) {
        handleValuesChange(eventValue);
      }
    };

    return (
      <input
        autoComplete='one-time-code'
        className='ReactInputVerificationCode-item'
        onChange={onInputChange}
        onFocus={onInputFocus}
        onKeyDown={onInputKeyDown}
        ref={ref}
        value={value}
      />
    );
  }
);

export default Input;
