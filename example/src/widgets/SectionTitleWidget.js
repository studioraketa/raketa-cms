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

export const Spec = {
  title: 'Section title',
  category: 'General',
  primaryField: 'title',
  defaults: {
    align: 'text-center',
    title: 'Section title',
    containerSettings: {}
  },
  adminFields: {
    align: {
      type: 'select',
      options: [
        ['text-center', 'Center'],
        ['text-left', 'Left']
      ]
    },
    title: { type: 'text', placeholder: 'Enter something...', hint: '3 words' }
  }
}

export default SectionTitleWidget
