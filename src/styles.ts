import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --ReactInputVerificationCode-itemWidth: 4.5rem;
    --ReactInputVerificationCode-itemHeight: 5rem;
    --ReactInputVerificationCode-itemSpacing: 1rem;
  }
`;

export const Container = styled.div`
  display: flex;
  gap: var(--ReactInputVerificationCode-itemSpacing);
`;

export const Item = styled.input`
  width: var(--ReactInputVerificationCode-itemWidth);
  height: var(--ReactInputVerificationCode-itemHeight);
  padding: 0;
  border-radius: 4px;
  font-size: 1.5rem;
  font-weight: 400;
  text-align: center;
  border: 0;
  box-shadow: inset 0 0 0 1px #ccc;
  transition: box-shadow 0.2s ease-out;

  &:focus {
    box-shadow: inset 0 0 0 2px #888;
  }
`;
