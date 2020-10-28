import React from 'react'
import { TextInput, List } from '@raketa-cms/raketa-cms'

const SelectOptionField = ({ settings, onChangeItem }) => (
  <div>
    <TextInput
      label='Value'
      onChange={(value) => onChangeItem('value', value)}
      value={settings.value}
    />

    <TextInput
      label='Label'
      onChange={(value) => onChangeItem('label', value)}
      value={settings.label}
    />
  </div>
)

export default ({ onChange, options }) => (
  <div>
    <label htmlFor=''>Select options</label>

    <List
      listItem={(settings, onChangeItem) => (
        <SelectOptionField settings={settings} onChangeItem={onChangeItem} />
      )}
      onChangeList={(_, selectOptions) =>
        onChange(Object.assign({}, options, { selectOptions }))
      }
      items={options.selectOptions}
      primaryField='label'
      template={{ type: 'value', name: 'label' }}
    />
  </div>
)
