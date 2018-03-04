import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'raketa-ui';

const TextArea = ({ label, onChange, value, placeholder }) => {
  return (
    <TextField multiline label={label} value={value} placeholder={placeholder} onChange={value => onChange(value)} />
  );
};

TextArea.defaultProps = {
  value: '',
  placeholder: '',
};

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

export default TextArea;
