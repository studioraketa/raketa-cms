import React from 'react'

const fieldId = (field) => `form-${field.name}`

const Input = ({ field }) => (
  <input
    id={fieldId(field)}
    type={field.type}
    name={`data[${field.name}]`}
    placeholder={field.placeholder}
    required={field.required === 'yes'}
    pattern={field.pattern || null}
    maxLength={field.characterLimit}
    className='form-control'
  />
)

const EmailInput = ({ field }) => (
  <input
    id={fieldId(field)}
    type={field.type}
    name={`data[${field.name}]`}
    placeholder={field.placeholder}
    required={field.required === 'yes'}
    pattern={field.pattern || null}
    maxLength={field.characterLimit}
    className='form-control'
  />
)

const renderOptions = ({ options }) =>
  options &&
  options.selectOptions &&
  options.selectOptions.map((item) => (
    <option key={item.id} value={item.value}>
      {item.label}
    </option>
  ))

const SelectInput = ({ field }) => (
  <select
    name={`data[${field.name}]`}
    required={field.required === 'yes'}
    id={fieldId(field)}
  >
    <option value=''>{field.placeholder}</option>
    {renderOptions(field)}
  </select>
)

const Checkbox = ({ field }) => (
  <label
    htmlFor={`checkbox-id-${field.name}`}
    style={{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }}
  >
    <input type='hidden' name={`data[${field.name}]`} value='0' />

    <input
      type='checkbox'
      name={`data[${field.name}]`}
      id={`checkbox-id-${field.name}`}
      required={field.required === 'yes'}
      style={{ marginRight: '0.5em' }}
      defaultChecked={false}
      value='1'
    />

    <div dangerouslySetInnerHTML={{ __html: field.label }} />
  </label>
)

const LabelTag = ({ field }) => (
  <label htmlFor={fieldId(field)} className='control-label'>
    {`${field.label} ${field.required === 'yes' ? '*' : ''}`}
  </label>
)

const Hint = ({ field }) =>
  field.hint && <p className='help-block'>{field.hint}</p>

const Inputs = {
  select: SelectInput,
  text: Input,
  email: EmailInput
}

const InputTag = ({ field }) => {
  const Component = Inputs[field.type]

  if (Component) {
    return <Component field={field} />
  }

  throw new Error(`Unknown field type: ${field.type}`)
}

const FormInput = ({ field }) => {
  if (field.type === 'checkbox') {
    return <Checkbox field={field} />
  } else {
    return (
      <div className='form-group'>
        <LabelTag field={field} />
        <InputTag field={field} />
        <Hint field={field} />
      </div>
    )
  }
}

export default FormInput
