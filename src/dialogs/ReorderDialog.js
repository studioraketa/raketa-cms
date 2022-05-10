/* eslint-disable no-undef */
import React from 'react'
import styled from 'styled-components'
import { ReactSortable } from 'react-sortablejs'
import { H, P, Button } from '@raketa-cms/raketa-mir'
import Dialog from './Dialog'
import LibraryContext from '../LibraryContext'
import widgetData from '../helpers/widgetData'

const ReorderDialogItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => `calc(${props.theme.font.base} / 2)`};
  margin-bottom: ${(props) => `calc(${props.theme.font.base} / 2)`};
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 3px;
  color: ${(props) => props.theme.colors.black};
  cursor: move;

  h6 {
    margin-bottom: 0;
    margin-left: ${(props) => `calc(${props.theme.font.base} / 2)`};
  }
`

const cleanup = (string) => string.replace(/<[^>]*>?/gm, '')

const truncate = (str, num) => {
  if (str.length <= num) return str

  return str.slice(0, num) + '…'
}

const getWidgetTitle = (library, widget) => {
  const widgetComponent = library[widget.component]
  if (!widgetComponent) {
    console.error(`Unknown widget: ${widget.component}`)
    return `Unknown widget: ${widget.component}`
  }
  const widgetName = widgetData.title(widgetComponent) || widget.component
  const primaryField =
    widgetData.primaryField(widgetComponent) &&
    widget.settings[widgetData.primaryField(widgetComponent)]

  if (primaryField && typeof primaryField !== 'string') {
    throw new Error(
      `The primaryField value of '${widget.component}' must be either a string or not present!`
    )
  }

  const widgetTitle = primaryField ? truncate(cleanup(primaryField), 32) : ''

  return [widgetName, widgetTitle].filter((s) => s !== '').join(': ')
}

const ReorderDialog = ({
  widgets,
  onClose,
  onChange,
  onDelete,
  onSelectWidget
}) => {
  const { adminLibrary } = React.useContext(LibraryContext)

  return (
    <Dialog
      open
      onClose={onClose}
      title='Reorder'
      primaryLabel=''
      secondaryLabel='Close'
    >
      <P>Drag and drop elements below to reorder the page layout.</P>

      <ReactSortable
        list={widgets}
        setList={onChange}
        handle='[data-drag]'
        direction='horizontal'
        dragoverBubble
      >
        {widgets.map((widget) => (
          <div key={widget.widgetId}>
            <ReorderDialogItem data-drag>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <H
                  size='base'
                  style={{
                    paddingBottom: 0,
                    fontWeight: 500
                  }}
                >
                  {getWidgetTitle(adminLibrary, widget)}
                </H>
              </div>

              <div>
                {adminLibrary[widget.component] && (
                  <Button
                    type='button'
                    variant='primary'
                    onClick={() => {
                      onClose()
                      onSelectWidget(widget)
                    }}
                  >
                    Edit
                  </Button>
                )}

                <Button
                  type='button'
                  variant='danger'
                  onClick={() => {
                    if (!confirm('Are you sure?')) return
                    onDelete(widget.widgetId)
                  }}
                >
                  &times;
                </Button>
              </div>
            </ReorderDialogItem>
          </div>
        ))}
      </ReactSortable>
    </Dialog>
  )
}

ReorderDialog.defaultProps = {
  widgets: []
}

export default ReorderDialog
