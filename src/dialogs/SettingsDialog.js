import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'raketa-ui';

import TextArea from '../forms/TextArea';
import RichText from '../forms/RichText';
import TextInput from '../forms/TextInput';
import SelectMenu from '../forms/SelectMenu';
import ButtonSettings from '../forms/ButtonSettings';
import { humanize } from '../helpers/humanize';
import Dialog from './Dialog';
import ImagePicker from '../pickers/ImagePicker/ImagePicker';


const renderField = (field, value, onChange, opts) => {
  const handleChange = newValue => onChange(field, newValue);

  switch (opts.type) {
    case 'text': {
      return (<TextInput
        key={`dialog-${field}`}
        label={opts.label}
        value={value}
        onChange={handleChange}
      />);
    }

    case 'textarea': {
      return (
        <TextArea
          key={`dialog-${field}`}
          label={opts.label}
          value={value}
          onChange={handleChange}
        />);
    }

    case 'rich': {
      return (
        <RichText
          key={`dialog-${field}`}
          label={opts.label}
          value={value}
          onChange={handleChange}
        />);
    }

    case 'select': {
      return (
        <SelectMenu
          key={`dialog-${field}`}
          label={opts.label}
          options={opts.options}
          value={value}
          onChange={handleChange}
        />);
    }

    case 'image': {
      return (
        <ImagePicker
          key={`dialog-${field}`}
          label={opts.label}
          value={value}
          onChange={handleChange}
        />
      );
    }

    case 'button': {
      return (
        <ButtonSettings
          key={`dialog-${field}`}
          button_settings_title={opts.label}
          value={value}
          onChange={newValues => onChange(field, newValues)}
        />
      );
    }

    // case 'component': {
    //   const componentName = opts.component;
    //
    //   return React.createElement(window[componentName], {
    //     key: `dialog-${field}`,
    //     value,
    //     onChange: handleChange,
    //   });
    // }

    default: {
      return (<TextInput
        key={`dialog-${field}`}
        label={field}
        value={value}
        onChange={handleChange}
      />);
    }
  }
};

const SettingsDialog = ({
  open,
  widget,
  settings,
  onChangeField,
  onClose,
  onPrimary,
  headerToolbar,
  dialogSize,
}) => {
  let fields;

  if (typeof widget.adminFields === 'object') {
    fields = Object.keys(widget.adminFields).map(field =>
      renderField(
        field,
        settings[field],
        onChangeField,
        Object.assign({ label: humanize(field) }, widget.adminFields[field])),
      );
  }

  if (typeof widget.adminFields === 'function') {
    const items = settings.list ? settings.list : [];
    fields = widget.adminFields(items, onChangeField, settings);
  }

  return (
    <Dialog
      open={open}
      title={widget.title}
      primaryLabel="OK"
      width="700px"
      onPrimary={onPrimary}
      onClose={onClose}
      dialogSize={widget.dialogSize}
    >
      <Tabs>
        <div title="Content">{fields}</div>
        <div title="Settings">{headerToolbar()}</div>
      </Tabs>
    </Dialog>
  );
};

SettingsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  widget: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  onChangeField: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onPrimary: PropTypes.func.isRequired,
  headerToolbar: PropTypes.func,
  dialogSize: PropTypes.string,
};


export default SettingsDialog;
