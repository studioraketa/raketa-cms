import React from 'react';
import styles from './Textarea.scss';

const Textarea = ({
  name,
  value,
  placeholder,
  required,
  pattern,
  id,
  onChange,
}) => <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        id={id}
        onChange={onChange}
        className={styles.root}
      />;

Textarea.defaultProps = {
  type: 'text',
  value: '',
  onChange: () => {},
};

export default Textarea;