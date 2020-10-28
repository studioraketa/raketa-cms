import React from 'react'

import AdminBuilder from './AdminBuilder'
import PageRender from './PageRender'
import PAGE from './PAGE'

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

const LOCAL_STORAGE_KEY = 'raketa-cms-example'

const pickPage = () => {
  const loadedPage = window.localStorage.getItem(LOCAL_STORAGE_KEY)
  return loadedPage ? JSON.parse(loadedPage) : PAGE
}

const App = () => {
  if (typeof window === 'undefined') {
    return <h1>Loading...</h1>
  }

  return (
    <React.Fragment>
      <link
        rel='stylesheet'
        media='all'
        href='https://aimseducation.edu/assets/application-afbd19b7d4c79dfdedbc41a56884e5f681493e388c1f07f6f94193b5e13b08d5.css'
      />

      <Tabs>
        <div title='Admin'>
          <AdminBuilder
            page={pickPage()}
            back_url='https://google.com/'
            onSave={(page) => {
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(page))
            }}
          />
        </div>

        <div title='Render'>
          <PageRender page={pickPage()} />
        </div>
      </Tabs>
    </React.Fragment>
  )
}

export default App
