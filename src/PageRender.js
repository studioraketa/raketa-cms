import React from 'react'

const PageRender = ({ library, page }) => (
  <div>
    {page.widgets.map((widget, idx) =>
      React.createElement(
        library[widget.component],
        Object.assign({}, { key: idx }, widget.settings)
      )
    )}
  </div>
)

export default PageRender
