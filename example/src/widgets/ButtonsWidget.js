import React from 'react'
import { Container, List, ButtonSettings } from '@raketa-cms/raketa-cms'

const Button = ({ settings }) => {
  const { id, label, type, link, target, follow_link } = settings

  return (
    <a
      href={link}
      className={type}
      id={id ? id : ''}
      target={target}
      rel={follow_link === 'no-follow' ? 'nofollow' : ''}
    >
      {label}
    </a>
  )
}

const Widget = ({ list, containerSettings }) => (
  <Container settings={containerSettings}>
    <div className='container'>
      <nav className='navigation'>
        {list.map((item, idx) => (
          <Button settings={item.button} key={idx} />
        ))}
      </nav>
    </div>
  </Container>
)

const ButtonItem = ({ settings, onChangeItem }) => (
  <ButtonSettings
    value={settings.button}
    hint='This is a useful hint'
    onChange={(value) => onChangeItem('button', value)}
  />
)

const Config = {
  title: 'Buttons',
  category: 'General'
}

const Defaults = {
  list: [{ id: 1, button: ButtonSettings.defaults }],
  variant: '3_columns',
  containerSettings: {}
}

const Admin = (items, onChange, settings) => (
  <div>
    <List
      label='Buttons'
      primaryField='button.label'
      listItem={(settings, onChangeItem) => (
        <ButtonItem settings={settings} onChangeItem={onChangeItem} />
      )}
      onChangeList={onChange}
      items={items}
      template={{ id: 1, button: ButtonSettings.defaults }}
    />
  </div>
)

export { Widget, Config, Admin, Defaults }
