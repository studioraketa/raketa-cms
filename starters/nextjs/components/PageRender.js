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
