import React from 'react'
import { RaketaUIProvider } from 'raketa-ui'

import { add, removeById, updateFieldById, randomString } from './lists'

import MediaManagerContext from './MediaManagerContext'
import HostContext from './HostContext'
import Canvas from './Canvas'
import AdminSidebar from './lib/AdminSidebar'
import ReorderDialog from './dialogs/ReorderDialog'
import SettingsDialog from './dialogs/SettingsDialog'

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
  const [selectedWidget, setSelectedWidget] = React.useState(null)
  const [reorderOpen, setReorderOpen] = React.useState(false)

  const currentWidget = selectedWidget
    ? library[selectedWidget.component]
    : null

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

  const handleUpdate = (widget) => {
    setPage(
      Object.assign({}, page, {
        widgets: updateFieldById(
          page.widgets,
          'settings',
          widget.settings,
          widget.widgetId,
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
    if (JSON.stringify(widgets) !== JSON.stringify(page.widgets)) {
      setPage(Object.assign({}, page, { widgets }))
      notifyChange(page)
    }
  }

  const notifyChange = (page) => onChange(page)

  const handleSave = () => onSave(page)

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

  const handleChange = (field, value) => {
    const settings = {
      ...selectedWidget.settings,
      [field]: value
    }

    setSelectedWidget({
      ...selectedWidget,
      settings
    })
  }

  const handleSaveWidget = () => {
    handleUpdate(selectedWidget)
    setSelectedWidget(null)
  }

  const handleClose = () => {
    setSelectedWidget(null)
  }

  const { widgets } = page
  const sortableWidgets = widgets.map((widget) => ({
    ...widget,
    id: widget.widgetId,
    chosen: false,
    selected: false
  }))

  return (
    <RaketaUIProvider>
      <HostContext.Provider value={{ host }}>
        <MediaManagerContext.Provider value={{ mediaManager }}>
          <div style={{ paddingLeft: '64px' }}>
            {reorderOpen && (
              <ReorderDialog
                library={library}
                widgets={sortableWidgets}
                onChange={handleReorder}
                onDelete={handleRemove}
                onSelectWidget={setSelectedWidget}
                onClose={() => setReorderOpen(false)}
              />
            )}

            <AdminSidebar
              library={library}
              navigation={navigation}
              dirty={dirty}
              buttons={sidebarButtons}
              identifier={identifier}
              onSave={handleSave}
              onAddWidget={handleAdd}
              onReorderDialog={() => setReorderOpen(true)}
              onExit={onExit}
              onPasteWidget={handlePasteWidget}
            />

            <Canvas
              widgets={sortableWidgets}
              library={library}
              identifier={identifier}
              onReorder={handleReorder}
              onEdit={setSelectedWidget}
              onRemove={handleRemove}
            />

            {selectedWidget && (
              <SettingsDialog
                spacings={spacings}
                themes={themes}
                widget={currentWidget}
                settings={selectedWidget.settings}
                onChangeField={handleChange}
                onPrimary={() => {
                  handleSaveWidget()
                  handleClose()
                }}
                onClose={handleClose}
              />
            )}
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
