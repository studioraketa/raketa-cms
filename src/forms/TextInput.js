import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'raketa-ui';

const TextInput = ({ label, onChange, value, placeholder }) => {
  return (
    <TextField label={label} value={value} placeholder={placeholder} onChange={value => onChange(value)} />
  );
};

TextInput.defaultProps = {
  value: '',
  placeholder: '',
};

TextInput.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

export default TextInput;
