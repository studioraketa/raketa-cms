import React from 'react';
import styles from './Input.scss';

const Input = ({
  type,
  name,
  value,
  placeholder,
  required,
  pattern,
  id,
  onChange,
}) => <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        id={id}
        onChange={onChange}
        className={styles.root}
      />;

Input.defaultProps = {
  type: 'text',
  value: '',
  onChange: () => {},
};

export default Input;