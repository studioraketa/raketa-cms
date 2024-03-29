import React from 'react'
import { BuilderContext, PageBuilder } from '@raketa-cms/raketa-cms'
import { MediaManagerContext } from '@raketa-cms/raketa-image-picker'
import LIBRARY from './widgets'
import ADMIN_LIBRARY from './widgets/admin'
import IMAGES from './IMAGES'

class FakeMediaManager {
  findAll(callback, params = {}) {
    return callback(IMAGES)
  }
}

const mediaManager = new FakeMediaManager('/');

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

const BUTTON_STYLES = [
  ['primary', 'Primary'],
  ['primary-alt', 'Primary (white)'],
  ['secondary', 'Secondary'],
  ['text', 'Text']
];

const containerAdmin = {
  spacing: { type: 'select', options: SPACINGS },
  theme: { type: 'select', options: THEMES },
  containerID: { type: 'text', label: 'Section ID', hint: 'HTML ID attribute for use in anchors' },
  className: { type: 'text', label: 'CSS class' },
  containerType: { type: 'select', options: [['container', 'Standard'], ['extended-container', 'Extended container']] },
};

const configuration = {
  buttonStyles: BUTTON_STYLES,
  containerAdmin,
};

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
        <BuilderContext.Provider value={configuration}>
          <PageBuilder
            host={host}
            library={LIBRARY}
            adminLibrary={ADMIN_LIBRARY}
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
            page={page}
            onChange={handleChange}
            onSave={handleSave}
            onExit={() => (window.location.href = back_url)}
          />
        </BuilderContext.Provider>
      </MediaManagerContext.Provider>
    </ErrorBoundary>
  )
}

AdminBuilder.defaultProps = {
  host: 'http://localhost:3000/'
}

export default AdminBuilder
