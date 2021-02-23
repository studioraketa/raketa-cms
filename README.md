# @raketa-cms/raketa-cms

> Visual page building framework for editing and rendering component libraries

[![NPM](https://img.shields.io/npm/v/@raketa-cms/raketa-cms.svg)](https://www.npmjs.com/package/@raketa-cms/raketa-cms) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

- [Install](#install)
- [Usage](#usage)
  - [Quick overview](#quick-overview)
  - [Code Exapmles](#code-exapmles)
  - [Starter projects](#starter-projects)

## Install

```bash
npm install --save @raketa-cms/raketa-cms
```

## Usage

### Quick overview

The `PageBuilder` component renders a view where pages can be visually edited:
![PageBuilder Overview](/doc-assets/page-builder-overview.png)

1. The canvas - where the widgets are added
2. A button to access the widgets library
3. A button to see a compact list of all widgets currently on the page. Allows reordering, edit and deletion of widgets.
4. The save button. If it is green then there are changes to be saved.
5. A button for pasting widgets. Each widget has a copy button attached to it.
6. The exit button.

![PageBuilder Library](/doc-assets/page-builder-library.png)

1. The Widgets library

### Code examples

#### The PageBuilder

```jsx
import { PageBuilder } from '@raketa-cms/raketa-cms'

import WIDGETS from './widgets'

const THEMES = [
  ['none', 'None'],
  ['light', 'Light'],
  ['dark', 'Dark'],
]

const SPACINGS = [
  ['none', 'None'],
  ['both', 'Both'],
  ['top', 'Top'],
  ['bottom', 'Bottom']
]

const DEFAULT_THEME = 'dark'

<PageBuilder
  // A collection of widgets. Check The Widgets section for more details
  library={WIDGETS}
  // Currently the same as the library - should be separate in the future in order to optimise the amount of JS loaded in the frontend.
  adminLibrary={WIDGETS}
  // A collection of themes for the background of widgets. Those would be available in the admin settings for each widget
  themes={THEMES}
  defaultTheme={DEFAULT_THEME}
  // The widgets spacings. Those would be available in the admin settings for each widget
  spacings={SPACINGS}
  page={page}
  // Callback triggered on page change???
  onChange={(newPage) => console.log('Changing the page!')}
  // Callback triggered by the "Save" button.
  onSave={(newPage) => console.log('Saving the page!')}
  // Callback triggered by the "Exit" button
  onExit={() => console.log('Exit...')}
/>
```

The structure of `newPage` in the `onChange` and `onSave` callbacks and the `page` prop is:

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
      id: 'wdwadwd'
    }
  ]
}
```

Each widget has the following settings:

- **component**: maps to the React component file in the widget library
- **settings**: a map containing the specific widget settings, editable by the user
  **widgetId**: a unique key to access, parse and manage the widget structure

Check [The Widgets](#-the-widgets) section for more information.

#### The PageRender

Once you have your `page` built with the `PageBuilder` you can create a simple `PageRender` component and use it:

```jsx
import React from 'react'
import WIDGETS from './widgets'

const PageRender = ({ page }) => (
  <React.Fragment>
    {page.widgets.map(({ widgetId, component, settings }) =>
      React.createElement(WIDGETS[component], { key: widgetId, ...settings })
    )}
  </React.Fragment>
)

export default PageRender
```

#### The Widgets

A widget is a reusable and editable content block, based on a component from a design system.

Each widget consists of several key pieces:

- **frontend**: what gets rendered to the visitors
- **defaults**: default values for newly added widgets
- **settings modal**: an admin interface to manage the widgets settings and content

Widgets’s `adminFields` setting can be either a JSON structure or a component. We tend to use the component style when we have a list widget and the JSON struct when we have a list.

Based on this, we divide widgets into two types:

- **simple widget**: a single piece of content, for example a video embed, or a client testimonial
- **list widget**: a repeatable list of similar items, for example an article list or an image slideshow

**Simple widgets**
![Simple Widget Settings](/doc-assets/simple-widget-settings-dialog.png)

The anotated code for a simple widget:

```jsx
import React from 'react'
import { Container } from '@raketa-cms/raketa-cms'

// The frontend
const SectionTitleWidget = ({ size, title, containerSettings }) => (
  <Container settings={containerSettings}>
    <div className='section-title'>
      <div className='container'>
        {size === 'lg' && <h1 className='title'>{title}</h1>}
        {size === 'md' && <h2 className='title'>{title}</h2>}
        {size === 'sm' && <h3 className='title'>{title}</h3>}
      </div>
    </div>
  </Container>
)

// Settings for the CMS UI
SectionTitleWidget.title = 'Section title' // sets the title for the settings modal
SectionTitleWidget.category = 'General' // groups widgets in the library list
SectionTitleWidget.primaryField = 'title' // used to distinguish similar widgets in the reorder modal

// We always supply defaults
SectionTitleWidget.defaults = {
  size: 'md',
  title: 'Section title',
  containerSettings: {}
}

// This JSON struct defines the UI for the settings modal
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
```

**List widgets**
![Simple Widget Settings](/doc-assets/list-widget-settings-dialog.png)

And an example for list widget:

```jsx
import React from 'react'
import {
  Container,
  List,
  SelectMenu,
  LinkSettings
} from '@raketa-cms/raketa-cms'
import Link from '../frontend/Link'

// The frontend
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

// Settings for the CMS UI
NavigationWidget.title = 'Navigation'
NavigationWidget.category = 'General'

// Provide defaults, notice the list key
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

// We define the admin interface for the settings modal
const ListItem = ({ settings, onChangeItem }) => (
  <div>
    <LinkSettings
      label='Link'
      onChange={(value) => onChangeItem('link', value)}
      value={settings.link}
    />
  </div>
)

// adminSettings can be a React component
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
      primaryField='link.label'
      onChangeList={onChange}
    />
  </div>
)

export default NavigationWidget
```

**Widget settings**
In order to build the admin interface for a widget we can use the following types of inputs:

- **text**: plain old text input
- **textarea**: multiline text input
- **select**: a drop-down menu
- **link**: CMS specific input for setting up link specific settings
- **button**: CMS specific input for setting up button specific settings
- **image**: CMS specific input for browsing and selecting an image
- **rich text**: CMS specific input for rich text editing, based on ReactRTE
- **custom**: You can supply your own React components, they need to provide the following interface – `label`, `value` and `onChange`

To use an input in the JSON notation:

```jsx
Widget.adminFields = {
  title: { type: 'text', label: 'Custom label' }
}
```

Or the same in the React-component version:

```jsx
import { TextInput } from '@raketa-cms/raketa-cms'

NavigationWidget.adminFields = (items, onChange, settings) => (
  <div>
    <TextInput
      label='Custom label'
      value={items.title}
      onChange={(value) => onChange('title', value)}
    />
  </div>
)
```

**Common settings**
Besides the specific settings per widget type, the CMS also provides a common set of settings, that is the same for all widgets:

- **spacing**: a configurable and consistant vertical spacing
- **theme**: a configurable color theme
- **HTML ID**: an id attribute for the widget, used mainly for in-page anchor links

#### Starter projects

- [Nextjs](./starters/nextjs/)

## License

MIT © [studioraketa](https://github.com/studioraketa)
