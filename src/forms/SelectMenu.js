import React from 'react';
import PropTypes from 'prop-types';
import { SelectField } from 'raketa-ui';

const prepareOption = (o) => {
  return {value: o[0], text: o[1]};
}

const SelectMenu = ({ label, options, onChange, value }) => (
  <SelectField
    label={label}
    options={options.map(o => prepareOption(o))}
    value={value}
    onChange={onChange}
    placeholder="Please select..."
  />
);

SelectMenu.defaultProps = {
  value: '',
};

SelectMenu.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

export default SelectMenu;
