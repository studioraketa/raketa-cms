import React from 'react';
import styled from 'styled-components';
import { Title, Button } from 'raketa-ui';

import Dropzone from 'react-dropzone';

const StyledDropzone = styled.div`
  position: relative;
  margin-bottom: 16px;
  height: 350px;
  color: #666;
  background-color: #efefef;
  border: 2px dashed #ddd;
`;

const DropzoneLabel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 16px;
`;

class Dropbox extends React.Component {
  constructor(props) {
    super(props);

    this.onOpenClick = this.onOpenClick.bind(this);
  }

  onOpenClick() {
    this.dropzone.open();
  }

  render() {
    return (
      <div>
        <StyledDropzone>
          <Dropzone ref={dropzone => this.dropzone = dropzone} onDrop={this.props.onDrop} style={{}}>
            <DropzoneLabel>
              <Title third>Select files from your computer</Title>
              <small>or drag and drop here</small>
            </DropzoneLabel>
          </Dropzone>
        </StyledDropzone>

        <Button type="button" success onClick={this.onOpenClick}>
          {this.props.buttonLabel}
        </Button>
      </div>
    );
  }
}

Dropbox.defaultProps = { buttonLabel: 'Select files...' };

export default Dropbox;
