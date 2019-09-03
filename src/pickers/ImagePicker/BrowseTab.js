import React from 'react';
import styled from 'styled-components';

const IconEdit = () => <img style={{ width: '12px', margin: '0 auto' }} src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMnB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAyMiAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5lZGl0LTI8L3RpdGxlPiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gICAgPGRlZnM+PC9kZWZzPiAgICA8ZyBpZD0iZWRpdC0yIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMi4wMDAwMDAsIDIuMDAwMDAwKSIgaWQ9IlNoYXBlIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMiI+ICAgICAgICAgICAgPHBvbHlnb24gcG9pbnRzPSIxMyAwIDE4IDUgNSAxOCAwIDE4IDAgMTMiPjwvcG9seWdvbj4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg==" />;

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
  cursor: pointer;
  width: 116px;
  height: 116px;
  border: 8px solid ${props => props.selected ? props.theme.successColor : 'transparent'};

  button { display: none; }

  &:hover {
    button { display: inline-block; }
  }
`;

const ImageWrapper = styled.div`
  & > img {
    object-fit: contain;
    width: 100px;
    height: 100px;
    background-color: #ddd;
  }
`;

const EditButton = styled.button`
  ${reset()}
  ${resetButton()}
  position: absolute;
  bottom: 8px;
  left: 12px;
  background-color: ${props => props.theme.successColor};
  font-size: .85em;
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const DeleteButton = styled.button`
  ${reset()}
  ${resetButton()}
  position: absolute;
  bottom: 8px;
  right: 12px;
  background-color: ${props => props.theme.dangerColor};
  font-size: 1em;
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  line-height: 19px;
`;

const ImageItem = ({ image, selected, onSelect, onFastSelect, onDelete, onEdit }) => (
  <Thumb
    selected={selected ? 'selected' : ''}
    onClick={() => onSelect(image)}
    onDoubleClick={() => onFastSelect(image)}
  >
    <ImageWrapper title={image.name}><Img src={image} variant="thumb" /></ImageWrapper>
    <EditButton
      type="button"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(image); }}
    ><IconEdit /></EditButton>
    <DeleteButton
      type="button"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(image); }}
    >&times;</DeleteButton>
  </Thumb>
);

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

export default BrowseTab;
