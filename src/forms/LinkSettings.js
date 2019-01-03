import React from 'react';
import styled from 'styled-components';
import { em, reset } from 'raketa-ui';

import TextInput from './TextInput';
import Textarea from './TextArea';
import SelectMenu from './SelectMenu';

const SettingsIcon = styled.span`
  display: inline-block;
  width: ${em(1)};
  height: ${em(1)};
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
  margin-bottom: ${em(.5)};
  font-size: ${em(.8)};
  text-transform: uppercase;
  font-weight: bold;
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

const mergeSettings = (settings, key, value) => Object.assign({}, settings, { [key]: value });

const LinkSettings = ({ label, value, onChange }) => (
  <ButtonControl>
    <FormSectionTitle>
      <SettingsIcon /> {label}
    </FormSectionTitle>

    <ThreeColumns>
      <TextInput
        label="Label"
        value={value.label}
        onChange={label => onChange(mergeSettings(value, 'label', label))}
      />

      <TextInput
        label="Link"
        value={value.link}
        onChange={link => onChange(mergeSettings(value, 'link', link))}
      />

      <TextInput
        label="ID"
        value={value.id}
        onChange={id => onChange(mergeSettings(value, 'id', id))}
      />
    </ThreeColumns>

    <ThreeColumns>
      <TextInput
        label="CSS Class"
        value={value.className}
        onChange={className => onChange(mergeSettings(value, 'className', className))}
      />

      <SelectMenu
        label="Target"
        options={[['_self', 'Self'], ['_blank', 'New Tab']]}
        value={value.target}
        onChange={target => onChange(mergeSettings(value, 'target', target))}
      />

      <SelectMenu
        label="Follow Link"
        options={[['follow', 'Follow'], ['nofollow', 'No Follow']]}
        value={value.rel}
        onChange={rel => onChange(mergeSettings(value, 'rel', rel))}
      />
    </ThreeColumns>
  </ButtonControl>
);

const DEFAULTS = {
  label: 'link',
  link: '#',
  id: '',
  className: '',
  target: '_self',
  rel: 'follow',
};

LinkSettings.defaultProps = {
  label: 'Link  ',
  value: DEFAULTS,
};

LinkSettings.defaults = DEFAULTS;

export default LinkSettings;
