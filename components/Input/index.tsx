import {
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from 'react';

import { useField } from '@unform/core';

import { Container } from './styles';
interface InputProps {
  name: string
  icon?: ReactNode,
  label: string
  placeholder?: string,
  type?: string,
  value?: string
}
const Input = (props: InputProps) => {
  const { name, label, icon: Icon, type, ...rest } = props
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      { type !== 'hidden' ? <label>{label}</label> : null}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        type={type}
        {...rest}
      />
    </Container>
  );
};

export default Input;
