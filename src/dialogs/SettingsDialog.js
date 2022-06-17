import React from 'react'
import styled from 'styled-components'
import { Tabs } from '@raketa-cms/raketa-mir'

import TextArea from '../forms/TextArea'
import RichText from '../forms/RichText'
import TextInput from '../forms/TextInput'
import SelectMenu from '../forms/SelectMenu'
import ButtonSettings from '../forms/ButtonSettings'
import { humanize, capitalize } from '../helpers/humanize'
import Dialog from './Dialog'
import ImagePicker from '../pickers/ImagePicker/ImagePicker'

import widgetData from '../helpers/widgetData'
const SegmentWrapper = styled.div`
  display: flex;
  gap: 0.5em;
  justify-content: space-between;
`

const Segment = styled.div`
  flex: 1;
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

const renderAdminFields = (widget, settings, onChange) =>
  Object.keys(widgetData.adminFields(widget)).map((field) => {
    const opts = Object.assign(
      { label: capitalize(humanize(field)) },
      widgetData.adminFields(widget)[field]
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

  if (typeof widgetData.adminFields(widget) === 'object') {
    fields = renderAdminFields(widget, localSettings, handleChangeField)
  }

  if (typeof widgetData.adminFields(widget) === 'function') {
    const items = localSettings.list ? localSettings.list : []
    fields = widgetData.adminFields(widget)(
      items,
      handleChangeField,
      localSettings
    )
  }

  const { containerSettings = {} } = localSettings

  return (
    <Dialog
      open
      title={widgetData.title(widget)}
      primaryLabel='OK'
      width='700px'
      onPrimary={() => onSave(localSettings)}
      onClose={onClose}
    >
      <Tabs>
        <div title='Content'>{fields}</div>
        <div title='Settings'>
          <SegmentWrapper>
            <Segment>
              <SelectMenu
                label='Spacing'
                options={spacings}
                value={containerSettings.spacing || ''}
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
                value={containerSettings.sectionID || ''}
                onChange={(newValue) =>
                  handleUpdateLayoutSettings('sectionID', newValue)
                }
              />
            </Segment>
            <Segment>
              <TextInput
                label='CSS class'
                value={containerSettings.className || ''}
                onChange={(newValue) =>
                  handleUpdateLayoutSettings('className', newValue)
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
