import React from 'react'
import { Container } from '@raketa-cms/raketa-cms'
import { ImagePicker } from '@raketa-cms/raketa-image-picker'
import DirectEmbed from './DirectEmbed'

const SingleVideoWidget = ({ image, videoUrl, containerSettings }) => (
  <Container settings={containerSettings}>
    <DirectEmbed image={image} videoUrl={videoUrl} />
  </Container>
)

export const Spec = {
  title: 'Single Video',
  category: 'Video',
  defaults: {
    image: 'http://placehold.it/540x540',
    videoUrl: 'https://www.youtube.com/watch?v=xqB9KJsbIlU',
    containerSettings: { theme: 'white' }
  },
  adminFields: {
    image: { type: 'custom', component: ImagePicker },
    videoUrl: { type: 'text' }
  }
}

export default SingleVideoWidget
