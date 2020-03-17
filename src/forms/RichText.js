import React from 'react';

export default () => (
  <div>
    <p>RichText is no longer part of @raketa-cms/raketa-cms. Please use @raketa-cms/raketa-rte</p>

    <strong>Update your imports</strong>
    <code>{`import {RichText} from '@raketa-cms/raketa-rte';`}</code>

    <strong>Update usage in JSON adminFields</strong>
    <code>{`text: { type: 'custom', component: RichText },`}</code>
  </div>
);
