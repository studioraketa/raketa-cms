import React from 'react'
import { Container, List, TextInput } from '@raketa-cms/raketa-cms'

const Widget = ({ list, containerSettings }) => (
  <Container settings={containerSettings}>
    <div className='container'>
      <nav className='navigation'>
        {list.map((item, idx) => (
          <a href={item.link} key={idx}>
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  </Container>
)

const NavigationItem = ({ settings, onChangeItem }) => (
  <div>
    <TextInput
      label='Title'
      onChange={(value) => onChangeItem('title', value)}
      value={settings.title}
    />

    <TextInput
      label='Link'
      onChange={(value) => onChangeItem('link', value)}
      value={settings.link}
    />
  </div>
)

const Config = {
  title: 'Navigation',
  category: 'General'
}

const Defaults = {
  list: [
    { id: 1, title: 'All', link: '#' },
    { id: 2, title: 'Houses', link: '#' },
    { id: 3, title: 'Offices', link: '#' },
    { id: 4, title: 'Apartments', link: '#' },
    { id: 5, title: 'Infrastructure', link: '#' }
  ],
  variant: '3_columns',
  containerSettings: {}
}

const Admin = (items, onChange, settings) => (
  <div>
    <List
      label='Navigation items'
      primaryField='title'
      listItem={(settings, onChangeItem) => (
        <NavigationItem settings={settings} onChangeItem={onChangeItem} />
      )}
      onChangeList={onChange}
      items={items}
      template={{ title: 'Title', link: '#' }}
    />
  </div>
)

export { Widget, Config, Defaults, Admin }
