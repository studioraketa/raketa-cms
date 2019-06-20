import React from 'react';
import {
  FormControl,
  Label,
  Button,
} from 'raketa-ui';
import TextArea from './TextArea';

class RichText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorValue: null,
      mode: 'rich',
    }

    this.RichTextEditor = null;
  }

  componentDidMount() {
    this.RichTextEditor = require('@dock365/react-rte').default;

    this.setState({
      plainValue: this.props.value,
      editorValue: this.RichTextEditor.createValueFromString(this.props.value, 'html'),
    });
  }

  onChange(editorValue) {
    const { onChange } = this.props;

    this.setState({ editorValue }, () => {
      if (onChange) onChange(editorValue.toString('html'));
    });
  }

  updatePlainValue(plainValue) {
    const { onChange } = this.props;

    this.setState({
      plainValue,
      editorValue: this.RichTextEditor.createValueFromString(plainValue, 'html'),
    }, () => {
      if (onChange) onChange(plainValue);
    });
  }

  render() {
    const { label, placeholder, onChange } = this.props;
    const { editorValue, plainValue, mode } = this.state;
    const RichTextEditor = this.RichTextEditor;

    const activeStyle = { marginRight: 0, backgroundColor: '#000', color: '#fff' };
    const inactiveStyle = { marginRight: 0, backgroundColor: '#fff', color: '#000' };

    return (
      <React.Fragment>
        {(mode === 'rich') && (
          <FormControl>
            {label &&
              <Label>{label}</Label>}

            {RichTextEditor &&
              <RichTextEditor
                value={editorValue}
                onChange={(v) => this.onChange(v)}
              />
            }
          </FormControl>
        )}

        {(mode === 'html') && (
          <TextArea
            label={label}
            placeholder={placeholder}
            value={plainValue}
            onChange={(v) => this.updatePlainValue(v)}
          />
        )}

        <div style={{ marginBottom: '14px', marginTop: '-14px' }}>
          <Button type="button" sm onClick={() => this.setState({ mode: 'rich' })} style={(mode === 'rich') ? activeStyle : inactiveStyle}>Rich</Button>
          <Button type="button" sm onClick={() => this.setState({ mode: 'html' })} style={(mode === 'html') ? activeStyle : inactiveStyle}>HTML</Button>
        </div>
      </React.Fragment >
    );
  }
}

RichText.defaultProps = {
  label: 'Text',
  value: '',
  placeholder: '',
};

export default RichText;
