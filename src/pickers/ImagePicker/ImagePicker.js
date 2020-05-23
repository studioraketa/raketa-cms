import React from 'react'

export default () => (
  <div>
    <p>
      ImagePicker is no longer part of @raketa-cms/raketa-cms. Please use
      @raketa-cms/raketa-image-input.{' '}
    </p>

    <strong>Update imports</strong>
    <p>
      <code>{`import { ImagePicker } from '@raketa-cms/raketa-image-picker';`}</code>
    </p>

    <strong>Update JSON adminFields</strong>
    <p>
      <code>{`image: { type: 'custom', component: ImagePicker },`}</code>
    </p>
  </div>
)
