import React from 'react';
import ReactDOM from 'react-dom';

class Dropzone extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isDragActive: false };

    this.onClick     = this.onClick.bind(this);
    this.onDragOver  = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop      = this.onDrop.bind(this);
  }

  onDragLeave(e) {
    this.setState({ isDragActive: false });
    if (this.props.onDragLeave) this.props.onDragLeave(e);
  }

  onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';

    // set active drag state only when file is dragged into
    // (in mozilla when file is dragged effect is "uninitialized")
    const effectAllowed = e.dataTransfer.effectAllowed;
    if (effectAllowed === 'all' || effectAllowed === 'uninitialized') this.setState({ isDragActive: true });

    if (this.props.onDragOver) this.props.onDragOver(e);
  }

  onDrop(e) {
    e.preventDefault();

    this.setState({ isDragActive: false });

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const maxFiles = (this.props.multiple) ? files.length : 1;
    for (let i = 0; i < maxFiles; i++) {
      files[i].preview = URL.createObjectURL(files[i]);
    }

    if (this.props.onDrop) {
      files = Array.prototype.slice.call(files, 0, maxFiles);
      this.props.onDrop(files, e);
    }
  }

  onClick() {
    if (this.props.supportClick === true) this.open();
  }

  open() {
    const fileInput = ReactDOM.findDOMNode(this.refs.fileInput);
    fileInput.value = null;
    fileInput.click();
  }

  render() {
    let className = this.props.className || 'dropzone';
    if (this.state.isDragActive) {
      className += this.props.activeClassName || ' active';
    }

    let style = {};
    if (this.props.style) { // user-defined inline styles take priority
      style = this.props.style;
    } else if (!this.props.className) { // if no class or inline styles defined, use defaults
      style = {
        // width: this.props.width || this.props.size || 100,
        // height: this.props.height || this.props.size || 100,
        // borderStyle: this.state.isDragActive ? 'solid' : 'dashed',
      };
    }

    return (
      React.createElement('div',
        {
          className,
          style,
          onClick: this.onClick,
          onDragLeave: this.onDragLeave,
          onDragOver: this.onDragOver,
          onDrop: this.onDrop,
        },
        React.createElement('input',
          {
            style: { display: 'none' },
            type: 'file',
            multiple: this.props.multiple,
            ref: 'fileInput',
            onChange: this.onDrop,
            accept: this.props.accept,
          },
        ),
        this.props.children,
      )
    );
  }
}

Dropzone.defaultProps = { supportClick: true, multiple: true };
Dropzone.displayName = 'Dropzone';

export default Dropzone;
