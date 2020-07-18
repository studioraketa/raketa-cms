import React from 'react'
import TextInput from './TextInput'

const TextArea = (props) => <TextInput multiline {...props} />

TextArea.defaultProps = {
  value: '',
  placeholder: ''
}

export default TextArea
