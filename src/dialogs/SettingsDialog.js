import React from 'react'
import { Tabs } from '@raketa-cms/raketa-mir'
import BuilderContext from '../contexts/BuilderContext'
import TextArea from '../forms/TextArea'
import RichText from '../forms/RichText'
import TextInput from '../forms/TextInput'
import SelectMenu from '../forms/SelectMenu'
import ButtonSettings from '../forms/ButtonSettings'
import { humanize, capitalize } from '../helpers/humanize'
import Dialog from './Dialog'
import ImagePicker from '../pickers/ImagePicker/ImagePicker'
import widgetData from '../helpers/widgetData'

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
          {...opts}
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
          {...opts}
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
          {...opts}
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
          {...opts}
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
          {...opts}
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
          {...opts}
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
          {...opts}
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

const renderAdmin = (schema = {}, settings = {}, onChange) =>
  Object.keys(schema).map((field) => {
    const opts = Object.assign(
      { label: capitalize(humanize(field)) },
      schema[field]
    )

    return renderField(field, settings[field], onChange, opts)
  })

const SettingsDialog = ({ widget, settings, onSave, onClose }) => {
  const { containerAdmin } = React.useContext(BuilderContext)
  const [localSettings, setLocalSettings] = React.useState(settings)

  const handleChange = (field, value) => {
    setLocalSettings({
      ...localSettings,
      [field]: value
    })
  }

  const handleChangeContainer = (field, value) => {
    handleChange('containerSettings', {
      ...localSettings.containerSettings,
      [field]: value
    })
  }

  const schema = widgetData.adminFields(widget)
  if (typeof schema !== 'object') {
    console.warn(
      `Legacy widget with React admin definition: ${widgetData.title(
        widget
      )}. Update to custom inputs. `
    )
  }

  const fields = renderAdmin(schema, localSettings, handleChange)

  const { containerSettings } = localSettings
  const containerAdminFields = renderAdmin(
    containerAdmin,
    containerSettings,
    handleChangeContainer
  )

  return (
    <Dialog
      open
      title={widgetData.title(widget)}
      primaryLabel='OK'
      onPrimary={() => onSave(localSettings)}
      onClose={onClose}
    >
      <Tabs>
        <div title='Content'>{fields}</div>
        <div title='Container'>{containerAdminFields}</div>
      </Tabs>
    </Dialog>
  )
}

export default SettingsDialog
