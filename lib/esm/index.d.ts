import { InputHTMLAttributes } from 'react';
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
declare const ReactInputVerificationCode: ({ autoFocus, inputProps, length, onChange, onCompleted, placeholder, type, value, }: ReactInputVerificationCodeProps) => JSX.Element;
export default ReactInputVerificationCode;
