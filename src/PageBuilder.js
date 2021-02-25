/* eslint-disable no-undef */
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from '@raketa-cms/raketa-mir'

import { add, removeById, updateFieldById, randomString } from './lists'

import HostContext from './HostContext'
import LibraryContext from './LibraryContext'
import Canvas from './Canvas'
import AdminSidebar from './lib/AdminSidebar'
import ReorderDialog from './dialogs/ReorderDialog'
import SettingsDialog from './dialogs/SettingsDialog'

const usePreventWindowUnload = (preventDefault) => {
  React.useEffect(() => {
    if (!preventDefault) return
    const handleBeforeUnload = (event) => {
      event.preventDefault()
      event.returnValue = ''

      return ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [preventDefault])
}

const PageBuilder = ({
  page: initialPage,
  library,
  adminLibrary,
  spacings,
  themes,
  defaultTheme,
  navigation,
  identifier,
  sidebarButtons,
  host,
  onChange,
  onSave,
  onExit
}) => {
  const [page, setPage] = React.useState(initialPage)
  const [dirty, setDirty] = React.useState(false)
  const [selectedWidget, setSelectedWidget] = React.useState(null)
  const [reorderOpen, setReorderOpen] = React.useState(false)

  usePreventWindowUnload(dirty)

  if (!adminLibrary) {
    console.warn('No adminLibrary provided to AdminBuilder. ')
  }

  const currentWidget = selectedWidget
    ? adminLibrary[selectedWidget.component]
    : null

  const factory = (widgetName, defaultTheme) => {
    const widget = adminLibrary[widgetName]
    const settings = widget.defaults

    if (settings.containerSettings) {
      settings.containerSettings.theme =
        settings.containerSettings.theme || defaultTheme
    } else {
      settings.containerSettings = { theme: defaultTheme }
    }

    return {
      widgetId: randomString(6),
      component: widgetName,
      settings: settings
    }
  }

  const handleAdd = (widgetName, defaultTheme) => {
    const widgets = add(page.widgets, factory(widgetName, defaultTheme))
    const newPage = {
      ...page,
      widgets
    }

    setPage(newPage)
    setDirty(true)

    notifyChange(newPage)
  }

  const handleUpdate = (widget) => {
    const widgets = updateFieldById(
      page.widgets,
      'settings',
      widget.settings,
      widget.widgetId,
      'widgetId'
    )
    const newPage = {
      ...page,
      widgets
    }

    setPage(newPage)

    notifyChange(newPage)
  }

  const handleRemove = (id) => {
    const widgets = removeById(page.widgets, id, 'widgetId')
    const newPage = {
      ...page,
      widgets
    }

    setPage(newPage)
    setDirty(true)

    notifyChange(newPage)
  }

  const handleReorder = (widgets) => {
    if (
      page.widgets.map((w) => w.widgetId).join() !==
      widgets.map((w) => w.widgetId).join()
    ) {
      const newPage = {
        ...page,
        widgets
      }

      setPage(newPage)
      setDirty(true)

      notifyChange(newPage)
    }
  }

  const notifyChange = (page) => onChange(page)

  const handleSave = () => {
    onSave(page)
    setDirty(false)
  }

  const handlePasteWidget = () => {
    const clipboardWidget = JSON.parse(
      window.localStorage.getItem(`clipboard–${identifier}`)
    )

    if (!clipboardWidget) return alert('Nothing to paste, yet')

    const newWidget = {
      widgetId: randomString(6),
      component: clipboardWidget.widgetName,
      settings: clipboardWidget.widget.settings
    }

    console.log(newWidget)

    const widgets = add(page.widgets, newWidget)
    const newPage = {
      ...page,
      widgets
    }

    setPage(newPage)
    setDirty(true)

    notifyChange(newPage)
  }

  const handleSaveWidget = (settings) => {
    handleUpdate({
      ...selectedWidget,
      settings
    })

    setDirty(true)
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
    <ThemeProvider theme={theme}>
      <HostContext.Provider value={{ host }}>
        <LibraryContext.Provider value={{ library, adminLibrary }}>
          <div style={{ paddingLeft: '64px' }}>
            {reorderOpen && (
              <ReorderDialog
                widgets={sortableWidgets}
                onChange={handleReorder}
                onDelete={handleRemove}
                onSelectWidget={setSelectedWidget}
                onClose={() => setReorderOpen(false)}
              />
            )}

            <AdminSidebar
              navigation={navigation}
              dirty={dirty}
              buttons={sidebarButtons}
              identifier={identifier}
              onSave={handleSave}
              onAddWidget={(widgetName) => handleAdd(widgetName, defaultTheme)}
              onReorderDialog={() => setReorderOpen(true)}
              onExit={onExit}
              onPasteWidget={handlePasteWidget}
            />

            <Canvas
              widgets={sortableWidgets}
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
                onSave={handleSaveWidget}
                onClose={handleClose}
              />
            )}
          </div>
        </LibraryContext.Provider>
      </HostContext.Provider>
    </ThemeProvider>
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
