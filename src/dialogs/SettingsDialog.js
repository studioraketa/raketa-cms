import React from 'react'
import { Tabs } from 'raketa-ui'

import TextArea from '../forms/TextArea'
import RichText from '../forms/RichText'
import TextInput from '../forms/TextInput'
import SelectMenu from '../forms/SelectMenu'
import ButtonSettings from '../forms/ButtonSettings'
import { humanize } from '../helpers/humanize'
import Dialog from './Dialog'
import ImagePicker from '../pickers/ImagePicker/ImagePicker'

const renderField = (field, value, onChange, opts) => {
  const handleChange = (newValue) => onChange(field, newValue)

  switch (opts.type) {
    case 'text': {
      return (
        <TextInput
          key={`dialog-${field}`}
          label={opts.label}
          value={value}
          onChange={handleChange}
        />
      )
    }

    case 'textarea': {
      return (
        <TextArea
          key={`dialog-${field}`}
          label={opts.label}
          value={value}
          onChange={handleChange}
        />
      )
    }

    case 'rich': {
      return (
        <RichText
          key={`dialog-${field}`}
          label={opts.label}
          value={value}
          onChange={handleChange}
        />
      )
    }

    case 'select': {
      return (
        <SelectMenu
          key={`dialog-${field}`}
          label={opts.label}
          options={opts.options}
          value={value}
          onChange={handleChange}
        />
      )
    }

    case 'image': {
      return (
        <ImagePicker
          key={`dialog-${field}`}
          label={opts.label}
          value={value}
          onChange={handleChange}
        />
      )
    }

    case 'button': {
      return (
        <ButtonSettings
          key={`dialog-${field}`}
          label={opts.label}
          value={value}
          onChange={handleChange}
        />
      )
    }

    case 'custom': {
      const Component = opts.component

      return (
        <Component
          key={`dialog-${field}`}
          label={opts.label}
          value={value}
          onChange={handleChange}
        />
      )
    }

    default: {
      return (
        <TextInput
          key={`dialog-${field}`}
          label={field}
          value={value}
          onChange={handleChange}
        />
      )
    }
  }
}

const renderAdminFields = (widget, settings, onChange) =>
  Object.keys(widget.adminFields).map((field) => {
    const opts = Object.assign(
      { label: humanize(field) },
      widget.adminFields[field]
    )
    return renderField(field, settings[field], onChange, opts)
  })

const SettingsDialog = ({
  open,
  widget,
  settings,
  onChangeField,
  onClose,
  onPrimary,
  renderCommonSettings
}) => {
  let fields

  if (typeof widget.adminFields === 'object') {
    fields = renderAdminFields(widget, settings, onChangeField)
  }

  if (typeof widget.adminFields === 'function') {
    const items = settings.list ? settings.list : []
    fields = widget.adminFields(items, onChangeField, settings)
  }

  return (
    <Dialog
      open={open}
      title={widget.title}
      primaryLabel='OK'
      width='700px'
      onPrimary={onPrimary}
      onClose={onClose}
      dialogSize={widget.dialogSize}
    >
      <Tabs>
        <div title='Content'>{fields}</div>
        <div title='Settings'>{renderCommonSettings()}</div>
      </Tabs>
    </Dialog>
  )
}

export default SettingsDialog
