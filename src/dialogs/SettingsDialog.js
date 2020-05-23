import React from 'react'
import styled from 'styled-components'
import { Tabs } from 'raketa-ui'

import TextArea from '../forms/TextArea'
import RichText from '../forms/RichText'
import TextInput from '../forms/TextInput'
import SelectMenu from '../forms/SelectMenu'
import ButtonSettings from '../forms/ButtonSettings'
import { humanize } from '../helpers/humanize'
import Dialog from './Dialog'
import ImagePicker from '../pickers/ImagePicker/ImagePicker'

const SegmentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const Segment = styled.div`
  width: 32%;
`

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
  spacings,
  themes,
  widget,
  settings,
  onSave,
  onClose
}) => {
  const [localSettings, setLocalSettings] = React.useState(settings)

  const handleChangeField = (field, value) => {
    setLocalSettings({
      ...localSettings,
      [field]: value
    })
  }

  const handleUpdateLayoutSettings = (field, value) => {
    handleChangeField('containerSettings', {
      ...localSettings.containerSettings,
      [field]: value
    })
  }

  let fields

  if (typeof widget.adminFields === 'object') {
    fields = renderAdminFields(widget, localSettings, handleChangeField)
  }

  if (typeof widget.adminFields === 'function') {
    const items = localSettings.list ? localSettings.list : []
    fields = widget.adminFields(items, handleChangeField, localSettings)
  }

  const { containerSettings } = localSettings

  return (
    <Dialog
      open
      title={widget.title}
      primaryLabel='OK'
      width='700px'
      onPrimary={() => onSave(localSettings)}
      onClose={onClose}
      dialogSize={widget.dialogSize}
    >
      <Tabs>
        <div title='Content'>{fields}</div>
        <div title='Settings'>
          <SegmentWrapper>
            <Segment>
              <SelectMenu
                label='Spacing'
                options={spacings}
                value={containerSettings.spacing}
                onChange={(newValue) =>
                  handleUpdateLayoutSettings('spacing', newValue)
                }
              />
            </Segment>
            <Segment>
              <SelectMenu
                label='Theme'
                options={themes}
                value={containerSettings.theme}
                onChange={(newValue) =>
                  handleUpdateLayoutSettings('theme', newValue)
                }
              />
            </Segment>
            <Segment>
              <TextInput
                label='Section ID'
                value={containerSettings.sectionID}
                onChange={(newValue) =>
                  handleUpdateLayoutSettings('sectionID', newValue)
                }
              />
            </Segment>
          </SegmentWrapper>
        </div>
      </Tabs>
    </Dialog>
  )
}

export default SettingsDialog
