import React from 'react';
import PropTypes from 'prop-types';

var RichTextEditor;
if (typeof(window) !== 'undefined') { RichTextEditor = require('react-rte').default; }

class RichText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorValue: RichTextEditor.createValueFromString(props.value, 'html'),
    }
  }

  onChange(editorValue) {
    const { onChange } = this.props;
    this.setState({ editorValue }, () => {
      if (onChange) onChange(editorValue.toString('html'));
    });
  }

  render() {
    const { label, value, placeholder } = this.props;
    const { editorValue } = this.state;

    return (
      <RichTextEditor
        value={editorValue}
        onChange={(v) => this.onChange(v)}
      />
    );
  }
}

RichText.defaultProps = {
  value: '',
  placeholder: '',
};

RichText.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

export default RichText;
