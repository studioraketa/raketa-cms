import React from 'react'
import { Container } from '@raketa-cms/raketa-cms'

const SectionTitleWidget = ({ align, title, containerSettings }) => (
  <Container settings={containerSettings}>
    <div className={`section-title ${align}`}>
      <div className='container'>
        <h2 className='title'>{title}</h2>
      </div>
    </div>
  </Container>
)

SectionTitleWidget.title = 'Section title'
SectionTitleWidget.category = 'General'
SectionTitleWidget.primaryField = 'title'
SectionTitleWidget.dialogSize = 'large'

SectionTitleWidget.defaults = {
  align: 'text-center',
  title: 'Section title',
  containerSettings: {}
}

SectionTitleWidget.adminFields = {
  align: {
    type: 'select',
    options: [
      ['text-center', 'Center'],
      ['text-left', 'Left']
    ]
  },
  title: { type: 'text', placeholder: 'Enter something...', hint: '3 words' }
}

export default SectionTitleWidget
