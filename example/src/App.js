import React from 'react'

import AdminBuilder from './AdminBuilder'
import PageRender from './PageRender'

const PAGE = {
  title: 'Example',
  slug: 'example',
  widgets: [
    {
      widgetId: 'xsmkfai',
      component: 'SectionTitleWidget',
      settings: {
        align: 'text-center',
        title: 'Section title',
        containerSettings: {}
      },
      id: 'xsmkfai',
      chosen: false,
      selected: false
    },
    {
      widgetId: 'hwvm3ul',
      component: 'NavigationWidget',
      settings: {
        list: [
          { id: 1, title: 'All', link: '#' },
          { id: 2, title: 'Houses', link: '#' },
          { id: 3, title: 'Offices', link: '#' },
          { id: 4, title: 'Apartments', link: '#' },
          { id: 5, title: 'Infrastructure', link: '#' }
        ],
        variant: '3_columns',
        containerSettings: {}
      },
      id: 'hwvm3ul',
      chosen: false,
      selected: false
    },
    {
      widgetId: 'zj3nij4',
      component: 'ImageWidget',
      settings: {
        variant: 'col-12',
        image: 'https://placehold.it/1920x1080',
        description: 'Example image',
        containerSettings: {}
      },
      id: 'zj3nij4',
      chosen: false,
      selected: false
    }
  ]
}

const Tabs = ({ children }) => {
  const [active, setActive] = React.useState(0)

  return (
    <React.Fragment>
      <div
        style={{
          position: 'fixed',
          top: '2em',
          right: '2em',
          zIndex: 1000,
          padding: '1em',
          backgroundColor: '#efefef'
        }}
      >
        {children.map((child, idx) => (
          <button key={idx} type='button' onClick={() => setActive(idx)}>
            {child.props.title}
          </button>
        ))}
      </div>

      {children[active]}
    </React.Fragment>
  )
}

const App = () => {
  return (
    <React.Fragment>
      <Tabs>
        <div title='Admin'>
          <AdminBuilder page={PAGE} back_url='https://google.com/' />
        </div>

        <div title='Render'>
          <PageRender page={PAGE} />
        </div>
      </Tabs>
    </React.Fragment>
  )
}

export default App
