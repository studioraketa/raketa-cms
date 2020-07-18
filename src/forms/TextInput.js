import React from 'react'
import { FormGroup, Label, Input, Textarea, P } from '@raketa-cms/raketa-mir'
import { randomString } from '../lists'

const TextField = (props) => {
  const id = randomString()
  const { label, hint, multiline, onChange } = props

  const inputProps = Object.assign({}, props)
  delete inputProps.label
  delete inputProps.hint
  delete inputProps.multiline
  delete inputProps.onChange

  const Component = multiline ? Textarea : Input

  return (
    <FormGroup>
      {label ? (
        <Label htmlFor={id} error={props.error}>
          {label}
        </Label>
      ) : (
        ''
      )}
      <Component
        id={id}
        onChange={(e) => onChange(e.target.value)}
        {...inputProps}
      />
      {hint ? <P>{hint}</P> : ''}
    </FormGroup>
  )
}

const TextInput = ({ label, onChange, value, placeholder }) => (
  <TextField
    label={label}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
  />
)

TextInput.defaultProps = {
  value: '',
  placeholder: ''
}

export default TextInput
