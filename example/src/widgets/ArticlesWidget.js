import React from 'react'
import {
  Container,
  List,
  TextInput,
  TextArea,
  SelectMenu,
  LinkSettings,
  Img
} from '@raketa-cms/raketa-cms'
import { ImagePicker } from '@raketa-cms/raketa-image-picker'

const Item = ({ title, image }) => (
  <div className='article'>
    <Img src={image} variant='fixed_image' className='image' />

    {title && <h3 className='title'>{title}</h3>}
  </div>
)

const ArticlesWidget = ({ variant, list, containerSettings }) => (
  <Container settings={containerSettings}>
    <div className='articles'>
      <div className='container'>
        <div className='row'>
          {list.map((item) => (
            <div key={item.id} className={variant}>
              <Item {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </Container>
)

const ListItem = ({ settings, onChangeItem }) => (
  <div>
    <ImagePicker
      label='Image'
      onChange={(value) => onChangeItem('image', value)}
      value={settings.image}
    />

    <TextInput
      label='Title'
      onChange={(value) => onChangeItem('title', value)}
      value={settings.title}
    />

    <TextArea
      label='Description'
      hint='Keep it brief – 1 or 2 sentences'
      onChange={(value) => onChangeItem('description', value)}
      value={settings.description}
    />
  </div>
)

export const Spec = {
  title: 'Articles',
  category: 'Feeds',
  defaults: {
    variant: 'col-6',
    list: [
      {
        id: 1,
        title: 'Title',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores distinctio ea non? Quisquam enim blanditiis deserunt cumque earum.',
        image: 'http://placehold.it/400x300'
      },
      {
        id: 2,
        title: 'Title',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores distinctio ea non? Quisquam enim blanditiis deserunt cumque earum.',
        image: 'http://placehold.it/400x300'
      }
    ],
    containerSettings: {}
  },
  adminFields: (items, onChange, settings) => (
    <div>
      <SelectMenu
        label='Variant'
        options={[
          ['col-6', '2 columns'],
          ['col-4', '3 columns'],
          ['col-3', '4 columns']
        ]}
        value={settings.variant}
        onChange={(value) => onChange('variant', value)}
      />

      <List
        itemsAlwaysOpen
        listItem={(settings, onChangeItem) => (
          <ListItem settings={settings} onChangeItem={onChangeItem} />
        )}
        items={items}
        template={{
          title: 'Title',
          link: LinkSettings.defaults,
          description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores distinctio ea non? Quisquam enim blanditiis deserunt cumque earum.',
          image: 'http://placehold.it/400x300'
        }}
        primaryField='title'
        onChangeList={onChange}
      />
    </div>
  )
}

export default ArticlesWidget
