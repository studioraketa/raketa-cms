import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dropbox from '../../lib/Dropbox';
import ProgressBar from '../../lib/ProgressBar';

const FileItem = ({ file }) => (
  <div className="file-item">
    <strong>{file.name}</strong>
    <span>Completed</span>
  </div>
);

FileItem.propTypes = {
  file: PropTypes.object.isRequired,
};

const FileList = ({ files }) => (
  <div>
    {files.map(file => <FileItem key={file.id} file={file} />)}
  </div>
);

FileList.propTypes = {
  files: PropTypes.array.isRequired,
};

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

UploadTab.propTypes = {
  filesToUpload: PropTypes.number.isRequired,
  filesUploaded: PropTypes.number.isRequired,
  files: PropTypes.array.isRequired,
  onUpload: PropTypes.func.isRequired,
};

export default UploadTab;
