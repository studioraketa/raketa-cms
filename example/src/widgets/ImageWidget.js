import React from 'react'
import { Container, Img } from '@raketa-cms/raketa-cms'
import { ImagePicker } from '@raketa-cms/raketa-image-picker'

const Widget = ({ variant, image, description, containerSettings }) => (
  <Container settings={containerSettings}>
    <div className='image'>
      <div className='container'>
        <div className='row'>
          <div className={variant}>
            <figure>
              <Img src={image} variant='lead' />
              {description && <figcaption>{description}</figcaption>}
            </figure>
          </div>
        </div>
      </div>
    </div>
  </Container>
)

const Config = {
  title: 'Image',
  category: 'General',
  primaryField: 'variant'
}

const Defaults = {
  variant: 'col-12',
  image: 'https://placehold.it/1920x1080',
  description: 'Example image',
  containerSettings: {}
}

const Admin = {
  variant: {
    type: 'select',
    options: [
      ['col-12', 'Full width'],
      ['shift-1', 'Shift 1'],
      ['shift-2', 'Shift 2']
    ]
  },
  image: { type: 'custom', component: ImagePicker },
  description: { type: 'text' }
}

export { Widget, Admin, Config, Defaults }
