import React from 'react';
import { FormControl, Label } from 'raketa-ui';

class RichText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorValue: null,
    }

    this.RichTextEditor = null;
  }

  componentDidMount() {
    this.RichTextEditor = require('@dock365/react-rte').default;

    this.setState({
      editorValue: this.RichTextEditor.createValueFromString(this.props.value, 'html'),
    });
  }

  onChange(editorValue) {
    const { onChange } = this.props;
    this.setState({ editorValue }, () => {
      if (onChange) onChange(editorValue.toString('html'));
    });
  }

  render() {
    const { label, placeholder } = this.props;
    const { editorValue } = this.state;
    const RichTextEditor = this.RichTextEditor;

    return (
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
    );
  }
}

RichText.defaultProps = {
  label: 'Text',
  value: '',
  placeholder: '',
};

export default RichText;
