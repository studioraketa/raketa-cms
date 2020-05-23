import React from 'react'
import { PageBuilder, MediaManager } from '@raketa-cms/raketa-cms'
import LIBRARY from './widgets'

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

  const mediaManager = new MediaManager('/images/client/')

  return (
    <ErrorBoundary>
      <PageBuilder
        host={host}
        dirty={dirty}
        library={LIBRARY}
        themes={THEMES}
        page={page}
        mediaManager={mediaManager}
        onChange={handleChange}
        onSave={handleSave}
        onExit={() => (window.location.href = back_url)}
      />
    </ErrorBoundary>
  )
}

AdminBuilder.defaultProps = {
  host: 'http://localhost:3000/'
}

export default AdminBuilder
