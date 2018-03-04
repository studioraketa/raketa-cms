import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MdEdit from 'react-icons/lib/md/edit';

import {
  reset,
  resetButton,
} from 'raketa-ui';

import Img from '../../lib/Image';
import TextInput from '../../forms/TextInput';

const ImageList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  margin-top: 1em;
  min-height: 500px;
`;

const Thumb = styled.div`
  position: relative;
  border: 4px solid transparent;
  cursor: pointer;
  width: 108px;
  height: 108px;
  ${props => props.selected ? 'border: 4px solid green;' : ''}
`;

const ImageWrapper = styled.div`
  & > img {
    object-fit: contain;
    width: 100px;
    height: 100px;
  }
`;

const DeleteButton = styled.button`
  ${reset()}
  ${resetButton()}
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #d00;
  padding: 0em .5em;
  font-size: 1em;
  color: #fff;
`;

const EditButton = styled.button`
  ${reset()}
  ${resetButton()}
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: ${props => props.theme.successColor};
  padding: .1em .5em;
  font-size: .85em;
  color: #fff;
`;

const ImageItem = ({ image, selected, onSelect, onFastSelect, onDelete, onEdit }) => (
  <Thumb
    selected={selected ? 'selected' : ''}
    onClick={() => onSelect(image)}
    onDoubleClick={() => onFastSelect(image)}
  >
    <ImageWrapper><Img src={image} variant="thumb" /></ImageWrapper>
    <EditButton
      type="button"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(image); }}
    ><MdEdit /></EditButton>
    <DeleteButton
      type="button"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(image); }}
    >&times;</DeleteButton>
  </Thumb>
);

ImageItem.propTypes = {
  image: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onFastSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

class BrowseTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImage: this.props.selectedImage || '',
    };
  }

  handleSelectImage(selectedImage) {
    this.setState({ selectedImage });
    this.props.onSelect(selectedImage);
  }

  render() {
    const { images, q, onFastSelect, onDelete, onSearch, onEdit } = this.props;
    const { selectedImage } = this.state;

    return (
      <div>
        <TextInput
          label="Search images"
          value={q}
          onChange={term => onSearch(term)}
        />

        <ImageList>
          {images.map(image =>
            <ImageItem
              key={image.id}
              image={image}
              selected={selectedImage.id === image.id}
              onSelect={onSelectedImage => this.handleSelectImage(onSelectedImage)}
              onFastSelect={onFastSelect}
              onDelete={onDelete}
              onEdit={onEdit}
            />)}
        </ImageList>
      </div>
    );
  }
}

BrowseTab.propTypes = {
  selectedImage: PropTypes.any.isRequired,
  q: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onFastSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default BrowseTab;
