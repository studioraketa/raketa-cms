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
    itemsAlwaysOpen
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
    // primaryField='item.name'
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
    <pre>{JSON.stringify(items, null, 2)}</pre>
    <List
      itemsAlwaysOpen
      label='Form rows'
      listItem={(settings, onChangeItem) => (
        <FormRowInputs
          items={settings.fields}
          onChange={(newFields) => {
            onChangeItem('fields', newFields)
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
          item: { ...FieldBuilder.defaults, name: 'name', label: 'Три имена' }
        }
      ]
    }
    // {
    //   id: 43,
    //   fields: [
    //     {
    //       id: 43,
    //       item: {
    //         ...FieldBuilder.defaults,
    //         name: "phone",
    //         label: "Телефон за връзка",
    //       },
    //     },
    //     {
    //       id: 44,
    //       item: {
    //         ...FieldBuilder.defaults,
    //         type: "email",
    //         name: "email",
    //         label: "Ел. поща",
    //       },
    //     },
    //   ],
    // },
    // {
    //   id: 45,
    //   fields: [
    //     {
    //       id: 48,
    //       item: {
    //         ...FieldBuilder.defaults,
    //         name: "product_ref",
    //         label: "Реф. номер",
    //       },
    //     },
    //     {
    //       id: 49,
    //       item: {
    //         ...FieldBuilder.defaults,
    //         name: "price",
    //         label: "Стойност на покупката",
    //       },
    //     },
    //   ],
    // },
    // {
    //   id: 46,
    //   fields: [
    //     {
    //       id: 47,
    //       item: {
    //         ...FieldBuilder.defaults,
    //         type: "checkbox",
    //         name: "consent",
    //         label: 'Съгласен съм с <a href="#">общите условия</a>',
    //       },
    //     },
    //   ],
    // },
  ],
  formUrl: 'https://forms-staging.raketa.cloud/submit/nz9aS_UD1h',
  button: ButtonSettings.defaults,
  variant: 'col-12',
  containerSettings: {}
}

export default AdminFields
