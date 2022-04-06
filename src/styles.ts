import styled from '@emotion/styled';

interface ContainerProps {
  itemsCount: number;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  position: relative;
  justify-content: space-between;
  width: ${({ itemsCount }) =>
    `calc(
      var(--ReactInputVerificationCode-itemWidth) * ${itemsCount}
      + var(--ReactInputVerificationCode-itemSpacing) * (${itemsCount} - 1)
    )`};
`;

interface InputProps {
  activeIndex: number;
}

export const Input = styled.input<InputProps>`
  position: absolute;
  top: 0;
  left: ${({ activeIndex }) =>
    `calc(
      var(--ReactInputVerificationCode-itemWidth) * ${activeIndex}
      + var(--ReactInputVerificationCode-itemSpacing) * ${activeIndex}
    )`};
  opacity: 0;
  width: var(--ReactInputVerificationCode-itemWidth);
  height: var(--ReactInputVerificationCode-itemHeight);
`;

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
