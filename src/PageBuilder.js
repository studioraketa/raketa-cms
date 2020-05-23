import React from 'react'
import { RaketaUIProvider } from 'raketa-ui'

import { add, removeById, updateFieldById, randomString } from './lists'

import MediaManagerContext from './MediaManagerContext'
import HostContext from './HostContext'
import Canvas from './Canvas'
import AdminSidebar from './lib/AdminSidebar'
import ReorderDialog from './dialogs/ReorderDialog'

const PageBuilder = ({
  page: initialPage,
  library,
  spacings,
  themes,
  navigation,
  dirty,
  identifier,
  sidebarButtons,
  host,
  mediaManager,
  onChange,
  onSave,
  onExit
}) => {
  const [page, setPage] = React.useState(initialPage)
  const [selectedWidgetId, setSelectedWidget] = React.useState(null)
  const [reorderOpen, setReorderOpen] = React.useState(false)

  const factory = (widgetName) => {
    const widget = library[widgetName]

    return {
      widgetId: randomString(6),
      component: widgetName,
      settings: widget.defaults
    }
  }

  const handleAdd = (widgetName) => {
    setPage(
      Object.assign({}, page, {
        widgets: add(page.widgets, factory(widgetName))
      })
    )
    notifyChange(page)
  }

  const handleUpdate = (id, settings) => {
    setPage(
      Object.assign({}, page, {
        widgets: updateFieldById(
          page.widgets,
          'settings',
          settings,
          id,
          'widgetId'
        )
      })
    )

    notifyChange(page)
  }

  const handleRemove = (id) => {
    setPage(
      Object.assign({}, page, {
        widgets: removeById(page.widgets, id, 'widgetId')
      })
    )

    notifyChange(page)
  }

  const handleReorder = (widgets) => {
    setPage(Object.assign({}, page, { widgets }))
    notifyChange(page)
  }

  const notifyChange = (page) => onChange(page)

  const handleSave = () => onSave(page)

  const handleSelectedWidgetId = (id) => setSelectedWidget(id)

  const handlePasteWidget = () => {
    const clipboardWidget = JSON.parse(
      window.localStorage.getItem(`clipboard–${identifier}`)
    )

    if (!clipboardWidget) return alert('Nothing to paste, yet')

    const newWidget = {
      widgetId: randomString(6),
      component: clipboardWidget.widgetName,
      settings: clipboardWidget.widget
    }

    setPage(Object.assign({}, page, { widgets: add(page.widgets, newWidget) }))
    notifyChange(page)
  }

  return (
    <RaketaUIProvider>
      <HostContext.Provider value={{ host }}>
        <MediaManagerContext.Provider value={{ mediaManager }}>
          <div style={{ paddingLeft: '64px' }}>
            <ReorderDialog
              open={reorderOpen}
              library={library}
              onClose={() => setReorderOpen(false)}
              onChange={handleReorder}
              onDelete={handleRemove}
              widgets={page.widgets}
              onSelectedWidgetId={handleSelectedWidgetId}
            />

            <AdminSidebar
              library={library}
              navigation={navigation}
              dirty={dirty}
              onSave={handleSave}
              onAddWidget={handleAdd}
              onReorderDialog={() => setReorderOpen(true)}
              onExit={onExit}
              buttons={sidebarButtons}
              identifier={identifier}
              onPasteWidget={handlePasteWidget}
            />

            <Canvas
              widgets={page.widgets}
              library={library}
              themes={themes}
              spacings={spacings}
              onReorder={handleReorder}
              onUpdate={handleUpdate}
              onRemove={handleRemove}
              identifier={identifier}
              selectedWidgetId={selectedWidgetId}
              onAdminWidgetDialogClose={() => setSelectedWidget(null)}
            />
          </div>
        </MediaManagerContext.Provider>
      </HostContext.Provider>
    </RaketaUIProvider>
  )
}

PageBuilder.defaultProps = {
  themes: [
    ['none', 'None'],
    ['light', 'Light'],
    ['dark', 'Dark']
  ],
  spacings: [
    ['none', 'None'],
    ['both', 'Both'],
    ['top', 'Top'],
    ['bottom', 'Bottom']
  ]
}

export default PageBuilder
