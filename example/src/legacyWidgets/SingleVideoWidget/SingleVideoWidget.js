import React from 'react';
import { Container } from '@raketa-cms/raketa-cms';
import { ImagePicker } from '@raketa-cms/raketa-image-picker';
import DirectEmbed from './DirectEmbed';

const SingleVideoWidget = ({ image, videoUrl, containerSettings }) => (
  <Container settings={containerSettings}>
    <DirectEmbed image={image} videoUrl={videoUrl} />
  </Container>
);

SingleVideoWidget.title = 'Single Video';
SingleVideoWidget.category = 'Video';

SingleVideoWidget.defaults = {
  image: 'http://placehold.it/540x540',
  videoUrl: 'https://www.youtube.com/watch?v=xqB9KJsbIlU',
  containerSettings: { theme: 'white' },
};

SingleVideoWidget.adminFields = {
  image: { type: 'custom', component: ImagePicker },
  videoUrl: { type: 'text' },
};

export default SingleVideoWidget;
