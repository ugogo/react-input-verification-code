import React, {
  Children,
  cloneElement,
  createContext,
  createRef,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const Context = createContext<{
  focusInput: (index: number) => void;
  handleValuesChange?: (values: string) => void;
  selectInputContent: (index: number) => void;
  setInputValue: (value: string, index: number) => void;
  validate: (data: string) => boolean;
}>({
  focusInput: () => null,
  handleValuesChange: () => null,
  selectInputContent: () => null,
  setInputValue: () => null,
  validate: () => true,
});

export interface ProviderProps {
  autoFocus?: boolean;
  children: ReactElement[];
  defaultValue?: string;
  onChange?: (data: string) => void;
  onCompleted?: (data: string) => void;
  type?: 'alphanumeric' | 'number';
}

export default function Provider({
  children,
  autoFocus,
  defaultValue = '',
  onChange = () => null,
  onCompleted = () => null,
  type = 'number',
}: ProviderProps) {
  /**
   * generate a new array, map through it
   * and replace with the value when possible
   */
  const fillValues = useCallback(
    (value: string) =>
      new Array(children.length).fill('').map((_, index) => value[index] ?? ''),
    [children.length]
  );

  const [values, setValues] = useState(fillValues(defaultValue));

  const refs = useMemo(
    () =>
      new Array(children.length)
        .fill(null)
        .map(() => createRef<HTMLInputElement>()),
    [children.length]
  );

  const focusInput = useCallback(
    (index: number) => {
      const input = refs[index]?.current;

      if (input) {
        requestAnimationFrame(() => {
          input.focus();
        });
      }
    },
    [refs]
  );

  const handleValuesChange = useCallback(
    (input: string) => {
      setValues(fillValues(input));

      const isCompleted = input.length === length;

      if (isCompleted) {
        onCompleted(input);
        // blurInput();
      }

      focusInput(input.length);
    },
    [fillValues, focusInput, onCompleted]
  );

  const selectInputContent = useCallback(
    (index: number) => {
      const input = refs[index]?.current;

      if (input) {
        requestAnimationFrame(() => {
          input.select();
        });
      }
    },
    [refs]
  );

  const setInputValue = useCallback(
    (value: string, index: number) => {
      const nextValues = [...values];
      nextValues[index] = value;

      setValues(nextValues);

      const stringifiedValues = nextValues.join('');
      const isLast = index === children.length - 1;
      console.log(index, children.length, index === children.length - 1);

      if (isLast) {
        onCompleted(stringifiedValues);
        return;
      }

      onChange(stringifiedValues);
    },
    [children.length, onChange, onCompleted, values]
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

  const memoizedValue = useMemo(
    () => ({
      focusInput,
      handleValuesChange,
      selectInputContent,
      setInputValue,
      validate,
    }),
    [
      focusInput,
      handleValuesChange,
      selectInputContent,
      setInputValue,
      validate,
    ]
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
    <Context.Provider value={memoizedValue}>
      <>{JSON.stringify(values, null, 2)}</>

      {Children.map(children, (child, index) =>
        cloneElement(child, {
          index,
          isLast: index === children.length - 1,
          value: values[index],
          ref: refs[index],
        })
      )}
    </Context.Provider>
  );
}

export function useInputVerificationCode() {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      'useInputVerificationCode can only be used inside of a Provider'
    );
  }

  return context;
}
