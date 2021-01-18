import React from 'react'
import {
  List,
  SelectMenu,
  TextInput,
  ButtonSettings
} from '@raketa-cms/raketa-cms'
import FieldBuilder from './FieldBuilder/FieldBuilder'

const FormRowInputs = ({ items, onChange }) => (
  <List
    label='Row Fields'
    listItem={(settings, onChangeItem) => (
      <FieldBuilder
        settings={settings.item}
        onChange={(newItem) => onChangeItem('item', newItem)}
      />
    )}
    onChangeList={(_, newItems) => onChange(newItems)}
    items={items}
    template={{ item: FieldBuilder.defaults }}
    primaryField='item.name'
  />
)

const AdminFields = (items, onChange, settings) => (
  <React.Fragment>
    <SelectMenu
      label='Variant'
      options={[
        ['col-12', 'col-12'],
        ['col-10', 'col-10'],
        ['col-8', 'col-8'],
        ['shift-1', 'shift-1'],
        ['shift-2', 'shift-2'],
        ['shift-3', 'shift-3'],
        ['shift-4', 'shift-4']
      ]}
      value={settings.variant}
      onChange={(value) => onChange('variant', value)}
    />

    <TextInput
      label='Form URL'
      onChange={(value) => onChange('formUrl', value)}
      value={settings.formUrl}
    />

    <ButtonSettings
      label='Button'
      onChange={(value) => onChange('button', value)}
      value={settings.button}
    />

    <List
      label='Form rows'
      listItem={(settings, onChangeItem) => (
        <FormRowInputs
          items={settings.fields}
          onChange={(newItems) => {
            onChangeItem('fields', newItems)
          }}
        />
      )}
      onChangeList={onChange}
      items={items}
      template={{ fields: [] }}
    />
  </React.Fragment>
)

AdminFields.defaults = {
  list: [
    {
      id: 42,
      fields: [
        {
          id: 42,
          item: { ...FieldBuilder.defaults, name: 'name', label: 'Name' }
        }
      ]
    },
    {
      id: 43,
      fields: [
        {
          id: 43,
          item: {
            ...FieldBuilder.defaults,
            name: 'phone',
            label: 'Phone'
          }
        },
        {
          id: 44,
          item: {
            ...FieldBuilder.defaults,
            type: 'email',
            name: 'email',
            label: 'Email'
          }
        }
      ]
    }
  ],
  formUrl: 'https://forms-staging.raketa.cloud/submit/lokO966r-V',
  button: ButtonSettings.defaults,
  variant: 'col-12',
  containerSettings: { theme: 'none' }
}

export default AdminFields
