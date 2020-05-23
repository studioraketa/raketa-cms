import React from 'react';
import { TextField } from 'raketa-ui';

const TextArea = ({ label, onChange, value, placeholder }) => (
  <TextField
    multiline
    label={label}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
  />
);

TextArea.defaultProps = {
  value: '',
  placeholder: '',
};

export default TextArea;
