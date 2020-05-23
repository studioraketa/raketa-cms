import React from 'react'

export default () => (
  <div>
    <p>
      RichText is no longer part of @raketa-cms/raketa-cms. Please use
      @raketa-cms/raketa-rte
    </p>

    <strong>Update your imports</strong>
    <p>
      <code>{`import {RichText} from '@raketa-cms/raketa-rte';`}</code>
    </p>

    <strong>Update usage in JSON adminFields</strong>
    <p>
      <code>{`text: { type: 'custom', component: RichText },`}</code>
    </p>
  </div>
)
