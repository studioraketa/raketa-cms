import React from 'react'
import styled from 'styled-components'
import SelectMenu from '../forms/SelectMenu'
import TextInput from '../forms/TextInput'

const SegmentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const Segment = styled.div`
  width: 32%;
`

const CommonSettings = ({ settings = {}, themes, spacings, onChange }) => {
  return (
    <SegmentWrapper>
      <Segment>
        <SelectMenu
          label='Spacing'
          options={spacings}
          value={settings.spacing}
          onChange={(newValue) => onChange('spacing', newValue)}
        />
      </Segment>
      <Segment>
        <SelectMenu
          label='Theme'
          options={themes}
          value={settings.theme}
          onChange={(newValue) => onChange('theme', newValue)}
        />
      </Segment>
      <Segment>
        <TextInput
          label='Section ID'
          value={settings.sectionID}
          onChange={(newValue) => onChange('sectionID', newValue)}
        />
      </Segment>
    </SegmentWrapper>
  )
}

export default CommonSettings
