import React, { FC } from 'react';
import Input from './Input';
import InputVerificationCodeProvider, { ProviderProps } from './context';

const ReactInputVerificationCode: FC<ProviderProps> & { Input: FC } = (
  props
) => (
  <div className='ReactInputVerificationCode-container'>
    <InputVerificationCodeProvider {...props} />
  </div>
);

ReactInputVerificationCode.Input = Input;

export default ReactInputVerificationCode;
