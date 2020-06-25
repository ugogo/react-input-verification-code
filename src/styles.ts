import styled from '@emotion/styled';

type ContainerProps = { itemsCount: number };
export const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  width: ${(props: ContainerProps) => `
    calc(var(--ReactInputVerificationCode-itemWidth) * ${props.itemsCount}
    + var(--ReactInputVerificationCode-itemSpacing)
    * (${props.itemsCount} - 1)
  `}
  );
`;

// input

type InputProps = {
  activeIndex: number;
};

export const Input = styled.input`
  position: absolute;
  top: 0;
  left: ${(props: InputProps) =>
    `calc(${props.activeIndex} * var(--ReactInputVerificationCode-itemWidth) + var(--ReactInputVerificationCode-itemSpacing) * ${props.activeIndex})`};
  opacity: 0;
  width: var(--ReactInputVerificationCode-itemWidth);
  height: var(--ReactInputVerificationCode-itemHeight);
`;

// item

export const Item = styled.div`
  width: var(--ReactInputVerificationCode-itemWidth);
  height: var(--ReactInputVerificationCode-itemHeight);
  padding: 0;
  border-radius: 4px;
  font-size: 1.5rem;
  font-weight: 800;
  line-height: var(--ReactInputVerificationCode-itemHeight);
  text-align: center;
  border: 0;
  box-shadow: inset 0 0 0 1px #ccc;
  transition: box-shadow 0.2s ease-out;

  &.is-active {
    box-shadow: inset 0 0 0 2px #888;
  }
`;
