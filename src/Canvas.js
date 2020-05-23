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
  ({ widgets, library, onReorder, onEdit, onRemove, identifier }) => {
    if (widgets.length === 0) {
      return (
        <EmptyCanvas>
          <div>
            <Title primary>It's always good to start with a clean slate.</Title>
            <Text>Use the sidebar to add content.</Text>
          </div>
        </EmptyCanvas>
      )
    }

    return (
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
              identifier={identifier}
              widget={widget}
              onEdit={onEdit}
              onDelete={onRemove}
            />
          </ErrorBoundary>
        ))}
      </ReactSortable>
    )
  },
  (props, nextProps) => {
    // TODO: Make the comparision quicker
    const themesAreEqual =
      JSON.stringify(props.themes) === JSON.stringify(nextProps.themes)
    const spacingsAreEqual =
      JSON.stringify(props.spacings) === JSON.stringify(nextProps.spacings)
    const widgetsAreEqual =
      JSON.stringify(props.widgets) === JSON.stringify(nextProps.widgets)

    return themesAreEqual && spacingsAreEqual && widgetsAreEqual
  }
)

export default Canvas