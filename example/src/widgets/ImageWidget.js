import React from 'react'
import { Container, Img } from '@raketa-cms/raketa-cms'
import { ImagePicker } from '@raketa-cms/raketa-image-picker'

const ImageWidget = ({ variant, image, description, containerSettings }) => (
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

export const Spec = {
  title: 'Image',
  category: 'General',
  primaryField: 'variant',
  defaults: {
    variant: 'col-12',
    image: 'https://placehold.it/1920x1080',
    description: 'Example image',
    containerSettings: {}
  },
  adminFields: {
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
}

export default ImageWidget
