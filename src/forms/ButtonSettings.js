import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { em, reset } from 'raketa-ui';

import TextInput from './TextInput';
import Textarea from './TextArea';
import SelectMenu from './SelectMenu';

const mergeSettings = (settings, key, value) => Object.assign({}, settings, { [key]: value });

const SettingsIcon = styled.span`
  display: inline-block;
  width: ${em(1.5)};
  height: ${em(1.25)};
  margin-right: ${em(.5)};
  background-size: 100% auto;
  background-repeat: none;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItc2xpZGVycyI+PGxpbmUgeDE9IjQiIHkxPSIyMSIgeDI9IjQiIHkyPSIxNCI+PC9saW5lPjxsaW5lIHgxPSI0IiB5MT0iMTAiIHgyPSI0IiB5Mj0iMyI+PC9saW5lPjxsaW5lIHgxPSIxMiIgeTE9IjIxIiB4Mj0iMTIiIHkyPSIxMiI+PC9saW5lPjxsaW5lIHgxPSIxMiIgeTE9IjgiIHgyPSIxMiIgeTI9IjMiPjwvbGluZT48bGluZSB4MT0iMjAiIHkxPSIyMSIgeDI9IjIwIiB5Mj0iMTYiPjwvbGluZT48bGluZSB4MT0iMjAiIHkxPSIxMiIgeDI9IjIwIiB5Mj0iMyI+PC9saW5lPjxsaW5lIHgxPSIxIiB5MT0iMTQiIHgyPSI3IiB5Mj0iMTQiPjwvbGluZT48bGluZSB4MT0iOSIgeTE9IjgiIHgyPSIxNSIgeTI9IjgiPjwvbGluZT48bGluZSB4MT0iMTciIHkxPSIxNiIgeDI9IjIzIiB5Mj0iMTYiPjwvbGluZT48L3N2Zz4=);

}`;

const ThreeColumns = styled.div`
  ${reset()}
  display: flex;

  & > div {
    width: 33.33%;
    padding-right: ${em(1)};;

    &:last-child { padding-right: 0; }
  }

  &:last-child {
    & > div {
      margin-bottom: 0;
    }
  }
`;

const FormSectionTitle = styled.h6`
  ${reset()}
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${em(1)};
`;

const ButtonSubLine = styled.div`
  ${reset()}

  & > div { margin-bottom: 0; }
`;

const ButtonControl = styled.div`
  ${reset()}
  margin-bottom: 0;

  & + div { margin-top: ${em(1)}; }
`;

const ButtonSettings = ({ button_settings_title, is_button_sub_line, value, onChange }) => {
  let isButtonSubLinePresent = is_button_sub_line;

  if (is_button_sub_line === undefined) isButtonSubLinePresent = false;

  return (
    <ButtonControl>
      <FormSectionTitle>
        <SettingsIcon /> {button_settings_title}
      </FormSectionTitle>

      <ThreeColumns>
        <TextInput
          label="Label"
          value={value.button_label}
          onChange={button_label => onChange(mergeSettings(value, 'button_label', button_label))}
        />

        <TextInput
          label="Link"
          value={value.button_link}
          onChange={button_link => onChange(mergeSettings(value, 'button_link', button_link))}
        />

        <TextInput
          label="ID"
          value={value.button_id}
          onChange={button_id => onChange(mergeSettings(value, 'button_id', button_id))}
        />
      </ThreeColumns>

      <ThreeColumns>
        <SelectMenu
          label="Type"
          options={[['regular', 'Regular'], ['accented', 'Accented'], ['link', 'Link']]}
          value={value.button_type}
          onChange={button_type => onChange(mergeSettings(value, 'button_type', button_type))}
        />

        <SelectMenu
          label="Target"
          options={[['_self', 'Self'], ['_blank', 'New Tab']]}
          value={value.button_target}
          onChange={button_target => onChange(mergeSettings(value, 'button_target', button_target))}
        />

        <SelectMenu
          label="Follow Link"
          options={[['follow', 'Follow'], ['no-follow', 'No Follow']]}
          value={value.follow_link}
          onChange={follow_link => onChange(mergeSettings(value, 'follow_link', follow_link))}
        />
      </ThreeColumns>

      {isButtonSubLinePresent ?
        <ButtonSubLine>
          <Textarea
            label="Sub Line"
            value={value.button_sub_line}
            onChange={button_sub_line => onChange(mergeSettings(value, 'button_sub_line', button_sub_line))}
          />
        </ButtonSubLine>
        : null
      }
    </ButtonControl>
  );
}

ButtonSettings.propTypes = {
  button_settings_title: PropTypes.string.isRequired,
  is_button_sub_line: PropTypes.bool,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};


export default ButtonSettings;
