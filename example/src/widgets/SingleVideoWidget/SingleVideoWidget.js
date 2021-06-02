import React from 'react'
import { Container } from '@raketa-cms/raketa-cms'
import { ImagePicker } from '@raketa-cms/raketa-image-picker'
import DirectEmbed from './DirectEmbed'

const Widget = ({ image, videoUrl, containerSettings }) => (
  <Container settings={containerSettings}>
    <DirectEmbed image={image} videoUrl={videoUrl} />
  </Container>
)

const Config = {
  title: 'Single Video',
  category: 'Video'
}

const Defaults = {
  image: 'http://placehold.it/540x540',
  videoUrl: 'https://www.youtube.com/watch?v=xqB9KJsbIlU',
  containerSettings: { theme: 'white' }
}
const Admin = {
  image: { type: 'custom', component: ImagePicker },
  videoUrl: { type: 'text' }
}

export default {
  Widget,
  Admin,
  Defaults,
  Config
}
