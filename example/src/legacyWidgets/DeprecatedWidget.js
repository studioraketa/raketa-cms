import React from 'react'
import { Container } from '@raketa-cms/raketa-cms'

const DeprecatedWidget = ({ align, title, containerSettings }) => (
  <Container settings={containerSettings}>
    <div className={`section-title ${align}`}>
      <div className='container'>
        <h2 className='title'>{title}</h2>
      </div>
    </div>
  </Container>
)

DeprecatedWidget.title = 'Deprecated Widget'
DeprecatedWidget.category = 'General'
DeprecatedWidget.primaryField = 'title'
DeprecatedWidget.dialogSize = 'large'
DeprecatedWidget.deprecated = true

DeprecatedWidget.defaults = {
  align: 'text-center',
  title: 'Deprecated Widget title',
  containerSettings: {}
}

DeprecatedWidget.adminFields = {
  align: {
    type: 'select',
    options: [
      ['text-center', 'Center'],
      ['text-left', 'Left']
    ]
  },
  title: { type: 'text', placeholder: 'Enter something...', hint: '3 words' }
}

export default DeprecatedWidget
