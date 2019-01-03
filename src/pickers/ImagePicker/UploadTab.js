import React from 'react';
import styled from 'styled-components';
import Dropbox from '../../lib/Dropbox';
import ProgressBar from '../../lib/ProgressBar';

const FileItem = ({ file }) => (
  <div>
    <strong>{file.name}</strong>
    <span>Completed</span>
  </div>
);

const FileList = ({ files }) => (
  <div>
    {files.map(file => <FileItem key={file.id} file={file} />)}
  </div>
);

const ImageUploader = styled.div`
  margin-top: 16px;
  min-height: 400px;
`;

class UploadTab extends React.Component {
  isUploading() {
    return this.props.filesToUpload !== this.props.filesUploaded;
  }

  renderProgress() {
    const { filesToUpload, filesUploaded, files } = this.props;

    return (
      <div>
        <ProgressBar total={filesToUpload} done={filesUploaded} />
        <FileList files={files} />
      </div>
    );
  }

  render() {
    return (
      <ImageUploader>
        {
          !this.isUploading() ? (
            <Dropbox
              onDrop={files => this.props.onUpload(files)}
              buttonLabel="Select files"
            />) : null}
        {this.isUploading() ? this.renderProgress() : null}
      </ImageUploader>
    );
  }
}

export default UploadTab;
