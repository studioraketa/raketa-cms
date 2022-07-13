import React from 'react'
import { PageBuilder } from '@raketa-cms/raketa-cms'
import { MediaManagerContext } from '@raketa-cms/raketa-image-picker'
import LIBRARY from './widgets'
import ADMIN_LIBRARY from './widgets/admin'
// import LIBRARY from './legacyWidgets'
// import ADMIN_LIBRARY from './legacyWidgets'
import IMAGES from './IMAGES'

class FakeMediaManager {
  findAll(callback, params = {}) {
    return callback(IMAGES)
  }
}

const mediaManager = new FakeMediaManager('/')

const THEMES = [
  ['none', 'None'],
  ['light', 'Light'],
  ['dark', 'Dark'],
  ['brand', 'Brand']
]

const DEFAULT_THEME = 'dark'

class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    console.error(error, info)
  }

  render() {
    const { children } = this.props
    return <React.Fragment>{children}</React.Fragment>
  }
}

const AdminBuilder = ({ page: defaultPage, host, back_url, onSave }) => {
  const [page, setPage] = React.useState(defaultPage)

  const handleChange = (page) => setPage(page)

  const handleSave = (page) => {
    console.log('Saving...', page)
    onSave && onSave(page)
  }

  return (
    <ErrorBoundary>
      <MediaManagerContext.Provider value={mediaManager}>
        <PageBuilder
          host={host}
          library={LIBRARY}
          adminLibrary={ADMIN_LIBRARY}
          themes={THEMES}
          buttonStyles={[
            ['primary', 'Primary'],
            ['primary-alt', 'Primary (white)'],
            ['secondary', 'Secondary'],
            ['text', 'Text']
          ]}
          languageSwitcherSettings={{
            current: 'EN',
            navigation: [
              { path: '/de', label: 'DE', newItem: true },
              { path: '/es', label: 'ES' }
            ]
          }}
          sidebarButtons={[
            {
              id: 'some-id',
              label: 'Prev',
              className: '',
              onClick: () => {
                console.log('Preview')
              }
            },
            {
              id: 'some-id-2',
              label: 'Label',
              className: '',
              icon: 'publish',
              onClick: () => {
                console.log('Publish')
              }
            },
            {
              id: 'some-id-3',
              label: 'Label',
              className: '',
              icon: 'settings',
              onClick: () => {
                console.log('Settings')
              }
            }
          ]}
          defaultTheme={DEFAULT_THEME}
          page={page}
          onChange={handleChange}
          onSave={handleSave}
          onExit={() => (window.location.href = back_url)}
        />
      </MediaManagerContext.Provider>
    </ErrorBoundary>
  )
}

AdminBuilder.defaultProps = {
  host: 'http://localhost:3000/'
}

export default AdminBuilder
