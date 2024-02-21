import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --ReactInputVerificationCode-itemWidth: 4.5rem;
    --ReactInputVerificationCode-itemHeight: 5rem;
    --ReactInputVerificationCode-itemSpacing: 1rem;
  }
`;

interface ContainerProps {
  itemscount: number;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  position: relative;
  justify-content: space-between;
  width: ${({ itemscount }) =>
    `calc(
      var(--ReactInputVerificationCode-itemWidth) * ${itemscount}
      + var(--ReactInputVerificationCode-itemSpacing) * (${itemscount} - 1)
    )`};
`;

interface InputProps {
  activeindex: number;
}

export const Input = styled.input<InputProps>`
  position: absolute;
  top: 0;
  left: ${({ activeindex }) =>
    `calc(
      var(--ReactInputVerificationCode-itemWidth) * ${activeindex}
      + var(--ReactInputVerificationCode-itemSpacing) * ${activeindex}
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
