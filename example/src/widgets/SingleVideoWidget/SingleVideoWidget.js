import React from 'react'
import { Container } from '@raketa-cms/raketa-cms'
import { ImagePicker } from '@raketa-cms/raketa-image-picker'
import DirectEmbed from './DirectEmbed'

const Widget = ({ image, videoUrl, useNoCookieDomain, containerSettings }) => (
  <Container settings={containerSettings}>
    <DirectEmbed
      image={image}
      videoUrl={videoUrl}
      noCookieDomains={useNoCookieDomain === 'yes'}
    />
  </Container>
)

const Config = {
  title: 'Single Video',
  category: 'Video'
}

const Defaults = {
  image: 'http://placeholder.raketa.cloud/images/540x540',
  videoUrl: 'https://www.youtube.com/watch?v=xqB9KJsbIlU',
  useNoCookieDomain: 'no',
  containerSettings: { theme: 'white' }
}
const Admin = {
  image: { type: 'custom', component: ImagePicker },
  useNoCookieDomain: {
    type: 'select',
    options: [
      ['yes', 'Yes'],
      ['no', 'No']
    ]
  },
  videoUrl: { type: 'text' }
}

export { Widget, Admin, Defaults, Config }
