import React from 'react'
import { Container } from '@raketa-cms/raketa-cms'

const Widget = ({ align, title, containerSettings }) => (
  <Container settings={containerSettings}>
    <div className={`section-title ${align}`}>
      <div className='container'>
        <h2 className='title'>{title}</h2>
      </div>
    </div>
  </Container>
)

const Config = {
  title: 'Section title',
  category: 'General',
  primaryField: 'title'
}

const Defaults = {
  align: 'text-center',
  title: 'Section title',
  containerSettings: {}
}

const Admin = {
  align: {
    type: 'select',
    options: [
      ['text-center', 'Center'],
      ['text-left', 'Left']
    ]
  },
  title: { type: 'text', placeholder: 'Enter something...', hint: '3 words' }
}

export default { Widget, Config, Admin, Defaults }
