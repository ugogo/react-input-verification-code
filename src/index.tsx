import * as React from 'react';
import './index.css';

const KEY_CODE = {
  BACKSPACE: 8,
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39,
  DELETE: 46,
};

const CONTAINER_DATA_ID = 'REACT_VERIFICATION_CODE_CONTAINER';

export default ({ length = 4, placeholder = '·' }) => {
  const [activeIndex, setActiveIndex] = React.useState<number>(-1);
  const [value, setValue] = React.useState<string[]>(
    new Array(length).fill(placeholder)
  );

  const codeInputRef = React.createRef<HTMLInputElement>();
  const itemsRef = React.useMemo(
    () => [...new Array(length)].map(() => React.createRef<HTMLDivElement>()),
    [length]
  );

  const isCodeRegex = new RegExp(`^[0-9]{${length}}$`);

  const getItem = (index: number) => itemsRef[index].current!;
  const focusItem = (index: number): void => getItem(index).focus();
  const blurItem = (index: number): void => getItem(index).blur();

  const onItemFocus = (index: number) => () => {
    setActiveIndex(index);
    if (codeInputRef.current) codeInputRef.current.focus();
  };

  const onItemKeyUp = ({ key, keyCode }: React.KeyboardEvent) => {
    const newValue = [...value];
    const nextIndex = activeIndex + 1;
    const prevIndex = activeIndex - 1;

    const isLast = nextIndex === length;
    const isDeleting =
      keyCode === KEY_CODE.DELETE || keyCode === KEY_CODE.BACKSPACE;

    // keep items focus in sync
    onItemFocus(activeIndex);

    // on delete, replace the current value
    // and focus on the previous item
    if (isDeleting) {
      newValue[activeIndex] = placeholder;
      setValue(newValue);

      if (activeIndex > 0) {
        setActiveIndex(prevIndex);
        focusItem(prevIndex);
      }

      return;
    }

    // if the key pressed is not a number
    // don't do anything
    if (Number.isNaN(+key)) return;

    // reset the current value
    // and set the new one
    if (codeInputRef.current) codeInputRef.current.value = '';
    newValue[activeIndex] = key;
    setValue(newValue);

    if (!isLast) {
      setActiveIndex(nextIndex);
      focusItem(nextIndex);
      return;
    }

    if (codeInputRef.current) codeInputRef.current.blur();
    getItem(activeIndex).blur();
    setActiveIndex(-1);
  };

  const onItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: changeValue } = e.target;
    const isCode = isCodeRegex.test(changeValue);

    if (!isCode) return;
    setValue(changeValue.split(''));
    blurItem(activeIndex);
  };

  React.useEffect(() => {
    const onDocumentClick = (e: MouseEvent) => {
      const targetIncludesContainer = e
        .composedPath()
        .reduce(
          (bool: boolean, path: HTMLElement) =>
            bool || path.dataset?.reactVerificationCodeId === CONTAINER_DATA_ID,
          false
        );

      if (!targetIncludesContainer) setActiveIndex(-1);
    };

    document.addEventListener('click', onDocumentClick);

    return () => {
      document.removeEventListener('click', onDocumentClick);
    };
  }, []);

  return (
    <div
      data-react-verification-code-id={CONTAINER_DATA_ID}
      className='ReactVerificationCode__container'
      style={
        {
          '--activeIndex': activeIndex,
          '--itemsCount': length,
          '--itemWidth': '4.5rem',
          '--itemHeight': '5rem',
          '--itemSpacing': '1rem',
        } as React.CSSProperties
      }
    >
      <input
        ref={codeInputRef}
        className='ReactVerificationCode__input'
        autoComplete='one-time-code'
        type='text'
        inputMode='decimal'
        id='one-time-code'
        // use onKeyUp rather than onChange for a better control
        // onChange is still needed to handle the autocompletion
        // when receiving a code by SMS
        onChange={onItemChange}
        onKeyUp={onItemKeyUp}
      />

      {itemsRef.map((ref, i) => (
        <div
          key={i}
          ref={ref}
          role='button'
          tabIndex={0}
          className={`ReactVerificationCode__item ${
            activeIndex === i ? 'is-active' : ''
          }`}
          onFocus={onItemFocus(i)}
        >
          {value[i] || placeholder}
        </div>
      ))}
    </div>
  );
};
