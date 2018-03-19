import React from 'react';
import PropTypes from 'prop-types';


import { Editor, EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class RichText extends React.Component {
  constructor(props) {
    super(props);

    const contentBlock = htmlToDraft(props.value);

    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }

  onEditorStateChange(newState) {
    const { onChange } = this.props;
    const { editorState } = this.state;

    this.setState({ editorState: newState }, () => {
      if (onChange) onChange(draftToHtml(convertToRaw(newState.getCurrentContent())));
    });
  };

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        onChange={state => this.onEditorStateChange(state)}
      />
    );
  }
}

// import RichTextEditor from 'react-rte';

// var RichTextEditor;
// if (typeof(window) !== 'undefined') { RichTextEditor = require('react-rte').default; }

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

// class RichText extends React.Component {
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
