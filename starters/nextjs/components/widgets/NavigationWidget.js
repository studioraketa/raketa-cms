import React from 'react'
import {
  Container,
  List,
  SelectMenu,
  LinkSettings
} from '@raketa-cms/raketa-cms'
import Link from '../frontend/Link'

const NavigationWidget = ({ color, list, containerSettings }) => (
  <Container settings={containerSettings}>
    <div className={`navigation ${color}`}>
      <div className='container'>
        {list.map((item) => (
          <Link key={item.id} settings={item.link} />
        ))}
      </div>
    </div>
  </Container>
)

NavigationWidget.title = 'Navigation'
NavigationWidget.category = 'General'

NavigationWidget.defaults = {
  color: 'darkgray',
  list: [
    {
      id: 1,
      link: LinkSettings.defaults
    },
    {
      id: 2,
      link: LinkSettings.defaults
    },
    {
      id: 3,
      link: LinkSettings.defaults
    }
  ],
  containerSettings: {}
}

const ListItem = ({ settings, onChangeItem }) => (
  <div>
    <LinkSettings
      label='Link'
      onChange={(value) => onChangeItem('link', value)}
      value={settings.link}
    />
  </div>
)

NavigationWidget.adminFields = (items, onChange, settings) => (
  <div>
    <SelectMenu
      label='Color'
      options={[
        ['darkgray', 'Dark Gray'],
        ['crimson', 'Crimson'],
        ['tomato', 'Tomato'],
        ['sandybrown', 'Sandy Brown'],
        ['slateblue', 'Slate Blue'],
        ['mediumseagreen', 'Medium Seagreen'],
        ['royalblue', 'Royal Blue']
      ]}
      value={settings.color}
      onChange={(value) => onChange('color', value)}
    />

    <List
      listItem={(settings, onChangeItem) => (
        <ListItem settings={settings} onChangeItem={onChangeItem} />
      )}
      items={items}
      template={{
        link: LinkSettings.defaults
      }}
      label='Links'
      primaryField='link.label'
      onChangeList={onChange}
    />
  </div>
)

export default NavigationWidget
