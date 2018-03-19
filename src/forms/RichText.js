import React from 'react';
import PropTypes from 'prop-types';

import ReactQuill from 'react-quill';

const MODULES = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, false] }],
    ['bold', 'italic','strike', 'blockquote'],
    ['link'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['clean']
  ],
};

const FORMATS = [
  'header',
  'bold', 'italic', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link'
];

class RichText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || ''
    };

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ value: value }, () => this.props.onChange(value));
  }

  render() {
    return (
      <ReactQuill modules={MODULES} formats={FORMATS} value={this.state.value} onChange={this.handleChange} />
    )
  }
}
// import { EditorState, convertToRaw, ContentState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';

// const TOOLBAR_CONFIG = {
//   options: ['blockType', 'inline', 'list', 'link', 'remove', 'history'],
// };


// class RichText extends React.Component {
//   constructor(props) {
//     super(props);

//     const contentBlock = htmlToDraft(props.value);

//     if (contentBlock) {
//       const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
//       const editorState = EditorState.createWithContent(contentState);
//       this.state = {
//         editorState,
//       };
//     }
//   }

//   onEditorStateChange(newState) {
//     const { onChange } = this.props;
//     const { editorState } = this.state;

//     this.setState({ editorState: newState }, () => {
//       if (onChange) onChange(draftToHtml(convertToRaw(newState.getCurrentContent())));
//     });
//   };

//   render() {
//     const { editorState } = this.state;

//     return (
//       <Editor
//         toolbar={TOOLBAR_CONFIG}
//         editorState={editorState}
//         onEditorStateChange={editorState => this.onEditorStateChange(editorState)}
//       />
//     )
//   }
// }

// class RichText2 extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       editorValue: RichTextEditor.createValueFromString(props.value, 'html'),
//     }
//   }

//   onChange(editorValue) {
//     const { onChange } = this.props;
//     this.setState({ editorValue }, () => {
//       if (onChange) onChange(editorValue.toString('html'));
//     });
//   }

//   render() {
//     const { label, value, placeholder } = this.props;
//     const { editorValue } = this.state;

//     return (
//       <RichTextEditor
//         value={editorValue}
//         onChange={(v) => this.onChange(v)}
//       />
//     );
//   }
// }

// RichText.defaultProps = {
//   value: '',
//   placeholder: '',
// };

// RichText.propTypes = {
//   label: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   value: PropTypes.string,
//   placeholder: PropTypes.string,
// };

export default RichText;
