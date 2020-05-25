import React from 'react'
import LIBRARY from './widgets'

const PageRender = ({ page }) => (
  <React.Fragment>
    {page.widgets.map(({ widgetId, component, settings }) =>
      React.createElement(LIBRARY[component], { key: widgetId, ...settings })
    )}
  </React.Fragment>
)

export default PageRender
