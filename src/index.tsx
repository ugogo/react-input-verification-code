import React, {
  ChangeEvent,
  createRef,
  InputHTMLAttributes,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import './index.css';

export interface ReactInputVerificationCodeProps {
  autoFocus?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  length?: number;
  onChange?: (data: string) => void;
  onCompleted?: (data: string) => void;
  placeholder?: string;
  type?: 'alphanumeric' | 'number';
  value?: string;
}

const ReactInputVerificationCode = ({
  autoFocus = false,
  inputProps,
  length = 4,
  onChange = () => null,
  onCompleted = () => null,
  placeholder = '·',
  type = 'number',
  value: defaultValue = '',
}: ReactInputVerificationCodeProps) => {
  /**
   * generate a new array, map through it
   * and replace with the value when possible
   */
  const fillValues = useCallback(
    (value: string) =>
      new Array(length).fill('').map((_, index) => value[index] ?? ''),
    [length]
  );

  const [values, setValues] = useState(fillValues(defaultValue));
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const inputsRefs = useMemo(
    () => new Array(length).fill(null).map(() => createRef<HTMLInputElement>()),
    [length]
  );

  const validate = useCallback(
    (input: string) => {
      if (type === 'number') {
        return /^\d/.test(input);
      }

      if (type === 'alphanumeric') {
        return /^[a-zA-Z0-9]/.test(input);
      }

      return true;
    },
    [type]
  );

  const selectInputContent = useCallback(
    (index: number) => {
      const input = inputsRefs[index].current;

      if (input) {
        requestAnimationFrame(() => {
          input.select();
        });
      }
    },
    [inputsRefs]
  );

  const setValue = useCallback(
    (value: string, index: number) => {
      const nextValues = [...values];
      nextValues[index] = value;

      setValues(nextValues);

      const stringifiedValues = nextValues.join('');
      const isCompleted = stringifiedValues.length === length;

      if (isCompleted) {
        onCompleted(stringifiedValues);
        return;
      }

      onChange(stringifiedValues);
    },
    [length, onChange, onCompleted, values]
  );

  const focusInput = useCallback(
    (index: number) => {
      const input = inputsRefs[index]?.current;

      if (input) {
        requestAnimationFrame(() => {
          input.focus();
        });
      }
    },
    [inputsRefs]
  );

  const blurInput = useCallback(
    (index: number) => {
      const input = inputsRefs[index]?.current;

      if (input) {
        requestAnimationFrame(() => {
          input.blur();
        });
      }
    },
    [inputsRefs]
  );

  const onInputFocus = useCallback(
    (index: number) => {
      const input = inputsRefs[index]?.current;

      if (input) {
        setFocusedIndex(index);
        selectInputContent(index);
      }
    },
    [inputsRefs, selectInputContent]
  );

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, index: number) => {
      event.preventDefault();

      const eventValue = event.target.value;
      console.log('-------');
      console.log('RIVC:onInputChange', {
        event,
        eventValue,
        focusedIndex,
        index,
      });

      /**
       * otp code or pasted value
       */
      if (eventValue.length > 1) {
        console.log('RIVC: isOtp', true);
        console.log('RIVC: fillValues(eventValue)', fillValues(eventValue));

        setValues(fillValues(eventValue));

        const isCompleted = eventValue.length === length;
        console.log('RIVC: isCompleted', isCompleted);

        if (isCompleted) {
          onCompleted(eventValue);
          blurInput(index);
          return;
        }

        focusInput(eventValue.length);
        return;
      }

      console.log('RIVC: isOtp', false);

      /**
       * ensure we only display 1 character in the input
       * by clearing the already setted value
       */
      const value = eventValue.replace(values[index], '');

      /**
       * if the value is not valid, don't go any further
       * and select the content of the input for a better UX
       */
      if (!validate(value)) {
        selectInputContent(index);
        return;
      }

      console.log('RIVC', { value });

      setValue(value, index);

      /**
       * if the input is the last of the list
       * blur it, otherwise focus the next one
       */
      if (index === length - 1) {
        blurInput(index);
        return;
      }

      focusInput(index + 1);
    },
    [
      blurInput,
      fillValues,
      focusInput,
      focusedIndex,
      length,
      onCompleted,
      selectInputContent,
      setValue,
      validate,
      values,
    ]
  );

  const onInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>, index: number) => {
      const eventKey = event.key;

      if (eventKey === 'Backspace' || eventKey === 'Delete') {
        /**
         * prevent trigger a change event
         * `onInputChange` won't be called
         */
        event.preventDefault();

        setValue('', focusedIndex);
        focusInput(index - 1);

        return;
      }

      /**
       * since the value won't change, `onInputChange` won't be called
       * only focus the next input
       */
      if (eventKey === values[index]) {
        focusInput(index + 1);
      }
    },
    [focusInput, focusedIndex, setValue, values]
  );

  /**
   * autoFocus
   */
  useEffect(() => {
    if (autoFocus) {
      focusInput(0);
    }
  }, [autoFocus, focusInput]);

  return (
    <div className='ReactInputVerificationCode-container'>
      {inputsRefs.map((ref, i) => (
        <input
          autoComplete='one-time-code'
          className='ReactInputVerificationCode-item'
          inputMode={type === 'number' ? 'numeric' : 'text'}
          key={i}
          onChange={(event) => onInputChange(event, i)}
          onFocus={() => onInputFocus(i)}
          onKeyDown={(event) => onInputKeyDown(event, i)}
          placeholder={placeholder}
          ref={ref}
          value={values[i]}
          {...inputProps}
        />
      ))}
    </div>
  );
};

export default ReactInputVerificationCode;
