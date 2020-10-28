import React from 'react'
import { SelectMenu, TextInput } from '@raketa-cms/raketa-cms'
import SelectOptions from './SelectOptions'

const fieldTypes = [
  ['text', 'Text'],
  ['email', 'Email'],
  ['select', 'Select'],
  ['checkbox', 'Checkbox']
]

const showSelectOptions = (fieldType) => fieldType === 'select'

const FieldBuilder = ({ settings, onChange }) => (
  <details>
    <summary>
      <SelectMenu
        label='Type'
        options={fieldTypes}
        value={settings.type}
        onChange={(value) => {
          onChange({ ...settings, type: value })
        }}
      />

      <TextInput
        label='Label'
        onChange={(value) => onChange({ ...settings, label: value })}
        value={settings.label}
      />

      <TextInput
        label='Name'
        onChange={(value) => onChange({ ...settings, name: value })}
        value={settings.name}
      />
    </summary>

    <TextInput
      label='Placeholder'
      onChange={(value) => onChange({ ...settings, placeholder: value })}
      value={settings.placeholder}
    />

    <TextInput
      label='Hint'
      onChange={(value) => onChange({ ...settings, hint: value })}
      value={settings.hint}
    />

    <SelectMenu
      label='Required'
      options={[
        ['yes', 'Yes'],
        ['no', 'No']
      ]}
      value={settings.required}
      onChange={(value) => onChange({ ...settings, required: value })}
    />

    <TextInput
      label='Pattern'
      onChange={(value) => onChange({ ...settings, pattern: value })}
      value={settings.pattern}
    />

    <TextInput
      label='Character Limit'
      onChange={(value) => onChange({ ...settings, characterLimit: value })}
      value={settings.characterLimit}
    />

    {showSelectOptions(settings.type) && (
      <SelectOptions
        onChange={(value) => onChange({ ...settings, options: value })}
        options={settings.options}
      />
    )}
  </details>
)

FieldBuilder.defaults = {
  type: 'text',
  name: 'first_name',
  label: 'First Name',
  placeholder: '',
  hint: '',
  required: 'yes',
  pattern: '',
  characterLimit: '',
  options: []
}

export default FieldBuilder
