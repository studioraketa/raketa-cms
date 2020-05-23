import React from 'react'
import { TextField } from 'raketa-ui'

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
