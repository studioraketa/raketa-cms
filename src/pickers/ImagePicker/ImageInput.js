import React from 'react';
import PropTypes from 'prop-types';
import { RaketaUIProvider } from 'raketa-ui';

import ImagePicker from './ImagePicker';

class ImageInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImage: props.image || false,
    };
  }

  render() {
    const { name, mediaManager } = this.props;
    const { selectedImage } = this.state;

    return (
      <RaketaUIProvider>
        <div>
          <ImagePicker
            mediaManager={mediaManager}
            value={selectedImage}
            onChange={selectedImage => this.setState({ selectedImage })}
          />

          <input type="hidden" name={name} value={selectedImage ? selectedImage.id : ''} />
        </div>
      </RaketaUIProvider>
    );
  }
}

ImageInput.propTypes = {
  // image: PropTypes.object.isRequired,
  // name: PropTypes.name.isRequired,
};

export default ImageInput;
