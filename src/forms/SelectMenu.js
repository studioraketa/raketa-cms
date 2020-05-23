import React from 'react';
import { SelectField } from 'raketa-ui';

const prepareOption = (o) => {
  return { value: o[0], text: o[1] };
}

const getOptions = (options, placeholder) => {
  const initialOptions = placeholder ? [{ value: '', text: placeholder }] : [];
  const preparedOptions = options.map(o => prepareOption(o));

  return [
    ...initialOptions,
    ...preparedOptions
  ]
}

const SelectMenu = ({ label, options, placeholder, onChange, value }) => (
  <SelectField
    label={label}
    options={getOptions(options, placeholder)}
    value={value}
    onChange={onChange}
  />
);

SelectMenu.defaultProps = {
  value: '',
  placeholder: 'Please select...',
};

export default SelectMenu;
