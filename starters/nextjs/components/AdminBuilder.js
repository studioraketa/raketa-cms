import React from 'react'
import { BuilderContext, PageBuilder } from '@raketa-cms/raketa-cms'

import WIDGETS from './widgets'

const SPACINGS = [
  ['', 'None'],
  ['spacing-both', 'Both'],
  ['spacing-top', 'Top'],
  ['spacing-bottom', 'Bottom']
]

const THEMES = [
  ['', 'None'],
  ['light-bg', 'Light'],
  ['dark-bg', 'Dark']
]

const BUTTON_STYLES = [
  ['primary', 'Primary'],
  ['secondary', 'Secondary'],
  ['text', 'Text']
]

const containerAdmin = {
  spacing: { type: 'select', options: SPACINGS },
  theme: { type: 'select', options: THEMES },
  containerID: {
    type: 'text',
    label: 'Section ID',
    hint: 'HTML ID attribute for use in anchors'
  },
  className: { type: 'text', label: 'CSS class' },
  containerType: {
    type: 'select',
    options: [
      ['container', 'Standard'],
      ['extended-container', 'Extended container']
    ]
  }
}

const configuration = {
  buttonStyles: BUTTON_STYLES,
  containerAdmin
}

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
      <BuilderContext.Provider value={configuration}>
        <PageBuilder
          host={host}
          library={WIDGETS}
          adminLibrary={WIDGETS}
          themes={THEMES}
          spacings={SPACINGS}
          page={page}
          onChange={(page) => setPage(page)}
          onSave={handleSave}
          onExit={() => (window.location.href = backUrl)}
        />
      </BuilderContext.Provider>
    </ErrorBoundary>
  )
}

export default AdminBuilder
