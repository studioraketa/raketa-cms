import React from 'react'
import { Container } from '@raketa-cms/raketa-cms'

const SectionTitleWidget = ({ size, title, containerSettings }) => (
  <Container settings={containerSettings}>
    {console.log({ containerSettings })}
    <div className='section-title'>
      <div className='container'>
        {size === 'lg' && <h1 className='title'>{title}</h1>}
        {size === 'md' && <h2 className='title'>{title}</h2>}
        {size === 'sm' && <h3 className='title'>{title}</h3>}
      </div>
    </div>
  </Container>
)

SectionTitleWidget.title = 'Section title'
SectionTitleWidget.category = 'General'
SectionTitleWidget.primaryField = 'title'

SectionTitleWidget.defaults = {
  size: 'md',
  title: 'Section title',
  containerSettings: {}
}

SectionTitleWidget.adminFields = {
  size: {
    type: 'select',
    options: [
      ['sm', 'Small'],
      ['md', 'Medium'],
      ['lg', 'Large']
    ]
  },
  title: { type: 'text' }
}

export default SectionTitleWidget
