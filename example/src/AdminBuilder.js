import React from 'react'
import { PageBuilder } from '@raketa-cms/raketa-cms'
import { MediaManagerContext } from '@raketa-cms/raketa-image-picker'
import LIBRARY from './widgets'
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

class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    console.error(error, info)
  }

  render() {
    const { children } = this.props
    return <React.Fragment>{children}</React.Fragment>
  }
}

const AdminBuilder = ({ page: defaultPage, host, back_url }) => {
  const [dirty, setDirty] = React.useState(false)
  const [page, setPage] = React.useState(defaultPage)

  const handleChange = (page) => {
    setPage(page)
    setDirty(true)
  }

  const handleSave = (page) => {
    console.log('Saving...', page)
    setDirty(false)
  }

  return (
    <ErrorBoundary>
      <MediaManagerContext.Provider value={mediaManager}>
        <PageBuilder
          host={host}
          dirty={dirty}
          library={LIBRARY}
          themes={THEMES}
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
