import React from 'react'
import styled from 'styled-components'
import { reset, Hint } from '@raketa-cms/raketa-mir'
import ButtonStyleContext from '../ButtonStyleContext'

import TextInput from './TextInput'
import SelectMenu from './SelectMenu'

const SettingsIcon = styled.span`
  display: inline-block;
  width: ${(props) => props.theme.font.base};
  height: ${(props) => props.theme.font.base};
  margin-right: ${(props) => `calc(${props.theme.font.base} / 2)`};
  background-size: 100% auto;
  background-repeat: none;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItc2xpZGVycyI+PGxpbmUgeDE9IjQiIHkxPSIyMSIgeDI9IjQiIHkyPSIxNCI+PC9saW5lPjxsaW5lIHgxPSI0IiB5MT0iMTAiIHgyPSI0IiB5Mj0iMyI+PC9saW5lPjxsaW5lIHgxPSIxMiIgeTE9IjIxIiB4Mj0iMTIiIHkyPSIxMiI+PC9saW5lPjxsaW5lIHgxPSIxMiIgeTE9IjgiIHgyPSIxMiIgeTI9IjMiPjwvbGluZT48bGluZSB4MT0iMjAiIHkxPSIyMSIgeDI9IjIwIiB5Mj0iMTYiPjwvbGluZT48bGluZSB4MT0iMjAiIHkxPSIxMiIgeDI9IjIwIiB5Mj0iMyI+PC9saW5lPjxsaW5lIHgxPSIxIiB5MT0iMTQiIHgyPSI3IiB5Mj0iMTQiPjwvbGluZT48bGluZSB4MT0iOSIgeTE9IjgiIHgyPSIxNSIgeTI9IjgiPjwvbGluZT48bGluZSB4MT0iMTciIHkxPSIxNiIgeDI9IjIzIiB5Mj0iMTYiPjwvbGluZT48L3N2Zz4=);
}`

const ThreeColumns = styled.div`
  ${reset}
  display: flex;

  & > div {
    width: 33.33%;
    padding-right: ${(props) => props.theme.font.base};

    &:last-child {
      padding-right: 0;
    }
  }

  &:last-child {
    & > div {
      margin-bottom: 0;
    }
  }
`

const FormSectionTitle = styled.h6`
  ${reset}
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${(props) => `calc(${props.theme.font.base} / 2)`};
  font-size: ${(props) => props.theme.font.small};
  text-transform: uppercase;
  font-weight: bold;
`

const ButtonControl = styled.div`
  ${reset}
  margin-bottom: 0;

  & + div {
    margin-top: ${(props) => props.theme.font.base};
  }
`

const DEFAULT_BUTTON_STYLES = [
  ['primary', 'Primary'],
  ['secondary', 'Secondary'],
  ['text', 'Text']
]

const mergeSettings = (settings, key, value) =>
  Object.assign({}, settings, { [key]: value })

const ButtonSettings = ({ label, hint, value, onChange }) => {
  const buttonStyles = React.useContext(ButtonStyleContext) || DEFAULT_BUTTON_STYLES;

  return (
    <ButtonControl>
      <FormSectionTitle>
        <SettingsIcon /> {label}
      </FormSectionTitle>

      <ThreeColumns>
        <TextInput
          label='Label'
          value={value.label}
          onChange={(label) => onChange(mergeSettings(value, 'label', label))}
        />

        <TextInput
          label='Link'
          value={value.link}
          onChange={(link) => onChange(mergeSettings(value, 'link', link))}
        />

        <TextInput
          label='ID'
          value={value.id}
          onChange={(id) => onChange(mergeSettings(value, 'id', id))}
        />
      </ThreeColumns>

      <ThreeColumns>
        <SelectMenu
          label='Type'
          options={buttonStyles}
          value={value.type}
          placeholder=''
          onChange={(type) => onChange(mergeSettings(value, 'type', type))}
        />

        <SelectMenu
          label='Target'
          options={[
            ['_self', 'Self'],
            ['_blank', 'New Tab']
          ]}
          value={value.target}
          onChange={(target) =>
            onChange(mergeSettings(value, 'target', target))
          }
        />

        <SelectMenu
          label='Follow Link'
          options={[
            ['follow', 'Follow'],
            ['nofollow', 'No Follow']
          ]}
          value={value.rel}
          onChange={(rel) => onChange(mergeSettings(value, 'rel', rel))}
        />
      </ThreeColumns>

      {hint ? <Hint>{hint}</Hint> : ''}
    </ButtonControl>
  )
}

const DEFAULTS = {
  label: 'Button',
  link: '#',
  id: '',
  type: 'primary',
  target: '_self',
  rel: 'follow'
}

ButtonSettings.defaultProps = {
  label: 'Button',
  value: DEFAULTS
}

ButtonSettings.defaults = DEFAULTS
ButtonSettings.defaultButtonStyles = DEFAULT_BUTTON_STYLES

export default ButtonSettings
