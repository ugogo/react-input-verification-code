import * as React from 'react';
export interface ReactInputVerificationCodeProps {
    autoFocus?: boolean;
    length?: number;
    onChange?: (data: string) => void;
    onCompleted?: (data: string) => void;
    placeholder?: string;
    value?: string;
    dataCy?: string;
    type?: 'text' | 'password';
    passwordMask?: string;
}
declare const ReactInputVerificationCode: ({ autoFocus, length, onChange, onCompleted, placeholder, value: pValue, dataCy, type, passwordMask, }: ReactInputVerificationCodeProps) => React.JSX.Element;
export default ReactInputVerificationCode;
