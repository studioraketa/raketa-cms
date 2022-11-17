# @raketa-cms/raketa-cms

[![NPM](https://img.shields.io/npm/v/@raketa-cms/raketa-cms.svg)](https://www.npmjs.com/package/@raketa-cms/raketa-cms) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Raketa CMS is a framework for building block based websites. It allows blocks (widgets) to be defined, provides admin interface for managing page content and functionality to render pages to visitors.

It plays nicely with Next.js and requires basic understanding of how React works.

## Install

```bash
yarn add @raketa-cms/raketa-cms
```

## Development

1. Install dependencies in both root directory and `example` directory
2. Run the package watcher in the root directory with `yarn start`
3. Start the example project with `yarn start`
4. Visit [http://localhost:3000/admin](http://localhost:3000/admin) to build pages or [http://localhost:3000](http://localhost:3000) to veiw them

## Usage

### User Interface overview

![PageBuilder Overview](/doc-assets/page-builder-overview.png)

1. **Canvas:** where widgets are added
2. **Library:** a list that allows editors to add widgets from a predefined library
3. **Reorder:** opens a modal to reorder widgets on the page
4. **Save:** a butto to save changes (shows in green if there are any changes)
5. **Paste:** an option to paste previoysly copied widget with its contents
6. **Exit:** Close the builder and go back to the previous screen

### Data structure

Information for a page is kept in a JSON structure. It requires a `widgets` key, an array of widgets that keep reference to the following:

- `widgetId`: unique ID for each component
- `component`: which widget from the library configuration to be used for rendering frontend and admin configuration
- `settings`: key-value pair for each widget setting

```js
{
  widgets: [
    {
      widgetId: 'xsmkfai',
      component: 'SectionTitleWidget',
      settings: {
        align: 'text-center',
        title: 'Section title',
        containerSettings: {
          theme: 'dark',
          spacing: 'bottom'
        }
      },
    }
  ]
}
```

### How to add the admin interface

Follow the example in: https://github.com/studioraketa/raketa-cms/blob/master/example/src/AdminBuilder.js


### How to integrate the frontend

Follow the example in: https://github.com/studioraketa/raketa-cms/blob/master/example/src/PageRender.js

### Widget definitions

A widget is a reusable and editable content block, based on a component from a design system.

Each widget consists of several key pieces:

- **frontend**: what gets rendered to the visitors
- **defaults**: default values for newly added widgets
- **settings modal**: an admin interface to manage the widgets settings and content

Widgets’s `adminFields` setting can be either a JSON structure or a component. We tend to use the component style when we have a list widget and the JSON struct when we have a list.

![Simple Widget Settings](/doc-assets/simple-widget-settings-dialog.png)

The anotated code for a simple widget:

```jsx
import React from 'react'
import { Container } from '@raketa-cms/raketa-cms'

// The frontend
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
  title: { type: 'text', placeholder: 'Enter something...', hint: '3 words' },
  button: { type: 'button' }
}

export { Widget, Config, Admin, Defaults }
```

#### Widget settings

In order to build the admin interface for a widget we can use the following types of inputs:

- **text**: plain old text input
- **textarea**: multiline text input
- **select**: a drop-down menu
- **link**: CMS specific input for setting up link specific settings
- **button**: CMS specific input for setting up button specific settings
- **custom**: You can supply your own React components, they need to provide the following interface – `label`, `value` and `onChange`

Admin schema is defined in the `Admin` configuration exported from the main widget file:

```js
const Admin = {
  align: {
    type: 'select',
    options: [
      ['text-center', 'Center'],
      ['text-left', 'Left']
    ]
  },
  title: { type: 'text', placeholder: 'Enter something...', hint: '3 words' },
  button: { type: 'button' }
}
```

#### Container settings

Besides the specific settings per widget type, the CMS also provides a common set of settings, that is the same for all widgets and is applied to the container.

The schema for the container settings follows the same format as the widget settings definition, but it's saved under `containerSettings` key under the widget settings.

It can be configured globally and passed to the configuration object (see example in https://github.com/studioraketa/raketa-cms/blob/master/example/src/AdminBuilder.js):

```js
const SPACINGS = [
  ['', 'None'],
  ['spacing-both', 'Both'],
  ['spacing-top', 'Top'],
  ['spacing-bottom', 'Bottom']
];

const THEMES = [
  ['', 'None'],
  ['light-bg', 'Light'],
  ['dark-bg', 'Dark'],
  ['brand-bg', 'Brand']
];

const containerAdmin = {
  spacing: { type: 'select', options: SPACINGS },
  theme: { type: 'select', options: THEMES },
  containerID: { type: 'text', label: 'Section ID', hint: 'HTML ID attribute for use in anchors' },
  className: { type: 'text', label: 'CSS class' },
  containerType: { type: 'select', options: [['container', 'Standard'], ['extended-container', 'Extended container']] },
};

const configuration = {
  containerAdmin,
};
```

#### Starter projects

- [Nextjs](./starters/nextjs/)

## License

MIT © [studioraketa](https://github.com/studioraketa)
