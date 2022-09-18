import React, {
  ChangeEvent,
  createRef,
  Fragment,
  KeyboardEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';

import * as S from './styles';

export interface ReactInputVerificationCodeProps {
  autoFocus?: boolean;
  length?: number;
  onChange?: (data: string) => void;
  onCompleted?: (data: string) => void;
  placeholder?: string;
  value?: string;
  dataCy?: string;
  type?: 'alphanumeric' | 'number';
}

const ReactInputVerificationCode = ({
  autoFocus = true,
  length = 4,
  onChange = () => {},
  onCompleted = () => {},
  placeholder = '·',
  // value: pValue,
  dataCy = 'verification-code',
  type = 'number',
}: ReactInputVerificationCodeProps) => {
  const [values, setValues] = useState(new Array(length).fill(placeholder));

  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // const codeInputRef = createRef<HTMLInputElement>();

  const inputsRefs = useMemo(
    () => new Array(length).fill(null).map(() => createRef<HTMLInputElement>()),
    [length]
  );

  // handle mobile autocompletion
  // const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { value: changeValue } = e.target;
  //   const isCode = isCodeRegex.test(changeValue);

  //   if (!isCode) return;

  //   setValue(changeValue.split(''));
  //   blurItem(activeIndex);
  // };

  const validate = (input: string) => {
    if (type === 'number') {
      return /^\d$/.test(input);
    }

    if (type === 'alphanumeric') {
      return /^[a-zA-Z0-9]$/.test(input);
    }

    return true;
  };

  const selectInputContent = (index: number) => {
    const input = inputsRefs[index].current;

    if (input) {
      requestAnimationFrame(() => {
        input.select();
      });
    }
  };

  const setValue = (value: string, index: number) => {
    const nextValues = [...values];
    nextValues[index] = value;

    setValues(nextValues);

    const stringifiedValues = nextValues.join('');
    const isCompleted = !stringifiedValues.includes(placeholder);

    if (isCompleted) {
      onCompleted(stringifiedValues);
      return;
    }

    onChange(stringifiedValues);
  };

  const focusInput = (index: number) => {
    const input = inputsRefs[index]?.current;

    if (input) {
      requestAnimationFrame(() => {
        input.focus();
      });
    }
  };

  const blurInput = (index: number) => {
    const input = inputsRefs[index]?.current;

    if (input) {
      requestAnimationFrame(() => {
        input.blur();
      });
    }
  };

  const onInputFocus = (index: number) => {
    const input = inputsRefs[index]?.current;

    if (input) {
      setFocusedIndex(index);
      selectInputContent(index);
    }
  };

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const eventValue = event.target.value;
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
  };

  const onInputKeyDown = (event: KeyboardEvent, index: number) => {
    const eventKey = event.key;

    if (eventKey === 'Backspace' || eventKey === 'Delete') {
      /**
       * prevent trigger a change event
       * `onInputChange` won't be called
       */
      event.preventDefault();

      setValue(placeholder, focusedIndex);
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
  };

  /**
   * autoFocus
   */
  useEffect(() => {
    if (autoFocus) {
      focusInput(0);
    }
  }, [inputsRefs]);

  // handle pasting
  // useEffect(() => {
  //   const codeInput = codeInputRef.current;
  //   if (!codeInput) return;

  //   const onPaste = (e: ClipboardEvent) => {
  //     e.preventDefault();

  //     const pastedString = e.clipboardData?.getData('text');
  //     if (!pastedString) return;

  //     const isNumber = /^\d+$/.test(pastedString);
  //     if (isNumber) setValue(pastedString.split('').slice(0, length));
  //   };

  //   codeInput.addEventListener('paste', onPaste);
  //   return () => codeInput.removeEventListener('paste', onPaste);
  // }, []);

  return (
    <Fragment>
      <S.GlobalStyle />

      <S.Container className='ReactInputVerificationCode__container'>
        {/* <S.Input
          // ref={codeInputRef}
          className='ReactInputVerificationCode__input'
          autoComplete='one-time-code'
          type='text'
          inputMode='decimal'
          id='one-time-code'
          activeIndex={activeIndex}
          data-cy={`${dataCy}-otc-input`}
        /> */}

        {inputsRefs.map((ref, i) => (
          <S.Item
            key={i}
            ref={ref}
            className='ReactInputVerificationCode__item'
            data-cy={`${dataCy}-${i}-item`}
            value={values[i]}
            onChange={(event) => onInputChange(event, i)}
            onFocus={() => onInputFocus(i)}
            onKeyDown={(event) => onInputKeyDown(event, i)}
          />
        ))}
      </S.Container>
    </Fragment>
  );
};

export default ReactInputVerificationCode;
