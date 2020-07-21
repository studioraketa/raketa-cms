import React from 'react'
import { FormGroup, Label, Input, Textarea, Hint } from '@raketa-cms/raketa-mir'
import { randomString } from '../lists'

const TextField = ({ label, hint, multiline, error, onChange, ...rest }) => {
  const id = randomString()
  const Component = multiline ? Textarea : Input

  return (
    <FormGroup>
      {label ? (
        <Label htmlFor={id} error={error}>
          {label}
        </Label>
      ) : (
        ''
      )}
      <Component id={id} onChange={(e) => onChange(e.target.value)} {...rest} />
      {hint ? <Hint>{hint}</Hint> : ''}
    </FormGroup>
  )
}

const TextInput = (props) => <TextField {...props} />

TextInput.defaultProps = {
  value: '',
  placeholder: ''
}

export default TextInput
