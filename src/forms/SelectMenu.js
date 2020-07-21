import React from 'react'
import { FormGroup, Label, Select, Hint } from '@raketa-cms/raketa-mir'
import { randomString } from '../lists'

const getOptions = (options, placeholder) => {
  const initialOptions = placeholder ? [{ value: '', text: placeholder }] : []
  const preparedOptions = options.map((o) => ({ value: o[0], text: o[1] }))

  return [...initialOptions, ...preparedOptions]
}

const SelectField = (props) => {
  const id = randomString()
  const { label, hint, options, placeholder, onChange } = props
  const inputProps = Object.assign({}, props)
  delete inputProps.label
  delete inputProps.hint
  delete inputProps.options
  delete inputProps.placeholder
  delete inputProps.onChange

  return (
    <FormGroup>
      {label ? (
        <Label htmlFor={id} error={props.error}>
          {label}
        </Label>
      ) : (
        ''
      )}
      <Select
        id={id}
        onChange={(e) => onChange(e.target.value)}
        {...inputProps}
      >
        {placeholder ? (
          <option key='placeholder' value={null}>
            {placeholder}
          </option>
        ) : (
          ''
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.text}
          </option>
        ))}
      </Select>
      {hint ? <Hint>{hint}</Hint> : ''}
    </FormGroup>
  )
}

const SelectMenu = ({ label, options, placeholder, onChange, value }) => (
  <SelectField
    label={label}
    options={getOptions(options, placeholder)}
    value={value}
    onChange={onChange}
  />
)

SelectMenu.defaultProps = {
  value: '',
  placeholder: 'Please select...'
}

export default SelectMenu
