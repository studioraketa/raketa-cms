import React from 'react';
import PropTypes from 'prop-types';

import styled, { ThemeProvider } from 'styled-components';
import theme from '../../raketa-ui/defaultTheme';

import ImagePicker from './ImagePicker';

class ImageInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImage: this.props.image || false,
    };
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <ImagePicker
            value={this.state.selectedImage}
            onChange={newImage => this.setState({ selectedImage: newImage })}
          />

          <input type="hidden" name={this.props.name} value={this.state.selectedImage ? this.state.selectedImage.id : ''} />
        </div>
      </ThemeProvider>
    );
  }
}

ImageInput.propTypes = {
  image: PropTypes.object.isRequired,
  name: PropTypes.name.isRequired,
};

export default ImageInput;
