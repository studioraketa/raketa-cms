import React from 'react'
import styled from 'styled-components'
import { Title, Text } from 'raketa-ui'

import { ReactSortable } from 'react-sortablejs'
import AdminWidget from './lib/AdminWidget'
import ErrorBoundary from './ErrorBoundary'

const EmptyCanvas = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Canvas = React.memo(
  ({
    widgets,
    library,
    themes,
    spacings,
    onReorder,
    onUpdate,
    onRemove,
    identifier,
    selectedWidgetId,
    onAdminWidgetDialogClose
  }) => (
    <React.Fragment>
      {widgets.length > 0 && (
        <ReactSortable
          list={widgets}
          setList={onReorder}
          handle='[data-drag]'
          direction='horizontal'
          dragoverBubble
        >
          {widgets.map((widget) => (
            <ErrorBoundary key={widget.widgetId}>
              <AdminWidget
                library={library}
                themes={themes}
                spacings={spacings}
                settings={widget}
                onUpdate={onUpdate}
                onDelete={onRemove}
                identifier={identifier}
                selectedWidgetId={selectedWidgetId}
                onAdminWidgetDialogClose={onAdminWidgetDialogClose}
              />
            </ErrorBoundary>
          ))}
        </ReactSortable>
      )}

      {widgets.length === 0 && (
        <EmptyCanvas>
          <div>
            <Title primary>It's always good to start with a clean slate.</Title>
            <Text>Use the sidebar to add content.</Text>
          </div>
        </EmptyCanvas>
      )}
    </React.Fragment>
  ),
  (props, nextProps) => {
    // TODO: Make the comparision quicker
    const themesAreEqual =
      JSON.stringify(props.themes) === JSON.stringify(nextProps.themes)
    const spacingsAreEqual =
      JSON.stringify(props.spacings) === JSON.stringify(nextProps.spacings)
    const widgetsAreEqual =
      JSON.stringify(props.widgets) === JSON.stringify(nextProps.widgets)
    const selectedWidgetIdIsEqual =
      JSON.stringify(props.selectedWidgetId) ===
      JSON.stringify(nextProps.selectedWidgetId)

    return (
      themesAreEqual &&
      spacingsAreEqual &&
      widgetsAreEqual &&
      selectedWidgetIdIsEqual
    )
  }
)

export default Canvas
