import React from 'react'
import { PageBuilder } from '@raketa-cms/raketa-cms'

import WIDGETS from './widgets'

const THEMES = [
  ['none', 'None'],
  ['light', 'Light'],
  ['dark', 'Dark']
]

const SPACINGS = [
  ['none', 'None'],
  ['both', 'Both'],
  ['top', 'Top'],
  ['bottom', 'Bottom']
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

const AdminBuilder = ({ page: defaultPage, host, backUrl, onSave }) => {
  const [page, setPage] = React.useState(defaultPage)

  const handleSave = (page) => {
    console.log('Saving...', page)
    onSave && onSave(page)
  }

  return (
    <ErrorBoundary>
      <PageBuilder
        host={host}
        library={WIDGETS}
        adminLibrary={WIDGETS}
        themes={THEMES}
        defaultTheme={DEFAULT_THEME}
        spacings={SPACINGS}
        page={page}
        onChange={(page) => setPage(page)}
        onSave={handleSave}
        onExit={() => (window.location.href = backUrl)}
      />
    </ErrorBoundary>
  )
}

export default AdminBuilder
