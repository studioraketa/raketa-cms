/* eslint-disable no-undef */
import React from 'react'
import styled from 'styled-components'
import { ReactSortable } from 'react-sortablejs'
import { H, P, Button } from '@raketa-cms/raketa-mir'
import Dialog from './Dialog'
import LibraryContext from '../LibraryContext'

const Handle = (props) => (
  <img
    {...props}
    src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItbW9yZS12ZXJ0aWNhbCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTIiIGN5PSI1IiByPSIxIj48L2NpcmNsZT48Y2lyY2xlIGN4PSIxMiIgY3k9IjE5IiByPSIxIj48L2NpcmNsZT48L3N2Zz4='
  />
)

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
  const widgetName = widgetComponent.title || widget.component
  const primaryField =
    widgetComponent.primaryField &&
    widget.settings[widgetComponent.primaryField]

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
                <Handle
                  style={{
                    display: 'inline-block',
                    width: '16px',
                    marginRight: '.5em'
                  }}
                />
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
