/* eslint-disable no-undef */
import React from 'react'
import styled from 'styled-components'

import { em } from 'raketa-ui'

const icons = {
  iconMove:
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMnB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAyMiAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5tb3ZlPC90aXRsZT4gICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+ICAgIDxkZWZzPjwvZGVmcz4gICAgPGcgaWQ9Im1vdmUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+ICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxLjAwMDAwMCwgMS4wMDAwMDApIiBpZD0iU2hhcGUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIj4gICAgICAgICAgICA8cG9seWxpbmUgcG9pbnRzPSIzIDcgMCAxMCAzIDEzIj48L3BvbHlsaW5lPiAgICAgICAgICAgIDxwb2x5bGluZSBwb2ludHM9IjcgMyAxMCAwIDEzIDMiPjwvcG9seWxpbmU+ICAgICAgICAgICAgPHBvbHlsaW5lIHBvaW50cz0iMTMgMTcgMTAgMjAgNyAxNyI+PC9wb2x5bGluZT4gICAgICAgICAgICA8cG9seWxpbmUgcG9pbnRzPSIxNyA3IDIwIDEwIDE3IDEzIj48L3BvbHlsaW5lPiAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDEwIEwyMCwxMCI+PC9wYXRoPiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMCwwIEwxMCwyMCI+PC9wYXRoPiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+',
  iconEdit:
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMnB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAyMiAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5lZGl0LTI8L3RpdGxlPiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gICAgPGRlZnM+PC9kZWZzPiAgICA8ZyBpZD0iZWRpdC0yIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMi4wMDAwMDAsIDIuMDAwMDAwKSIgaWQ9IlNoYXBlIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMiI+ICAgICAgICAgICAgPHBvbHlnb24gcG9pbnRzPSIxMyAwIDE4IDUgNSAxOCAwIDE4IDAgMTMiPjwvcG9seWdvbj4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg==',
  iconDelete:
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMnB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAyMiAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT50cmFzaDwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJ0cmFzaCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4gICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuMDAwMDAwLCAxLjAwMDAwMCkiIGlkPSJTaGFwZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiPiAgICAgICAgICAgIDxwb2x5bGluZSBwb2ludHM9IjAgNCAyIDQgMTggNCI+PC9wb2x5bGluZT4gICAgICAgICAgICA8cGF0aCBkPSJNMTYsNCBMMTYsMTggQzE2LDE5LjEwNDU2OTUgMTUuMTA0NTY5NSwyMCAxNCwyMCBMNCwyMCBDMi44OTU0MzA1LDIwIDIsMTkuMTA0NTY5NSAyLDE4IEwyLDQgTTUsNCBMNSwyIEM1LDAuODk1NDMwNSA1Ljg5NTQzMDUsMCA3LDAgTDExLDAgQzEyLjEwNDU2OTUsMCAxMywwLjg5NTQzMDUgMTMsMiBMMTMsNCI+PC9wYXRoPiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+',
  iconCopy:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItY29weSI+PHJlY3QgeD0iOSIgeT0iOSIgd2lkdGg9IjEzIiBoZWlnaHQ9IjEzIiByeD0iMiIgcnk9IjIiPjwvcmVjdD48cGF0aCBkPSJNNSAxNUg0YTIgMiAwIDAgMS0yLTJWNGEyIDIgMCAwIDEgMi0yaDlhMiAyIDAgMCAxIDIgMnYxIj48L3BhdGg+PC9zdmc+'
}

const colors = {
  primary: 'rgb(0,102,221)',
  secondary: '#000',
  danger: '#d00',
  neutral: '#fff'
}

const IconButton = (props) => (
  <div
    type='button'
    style={{
      display: 'inline-block',
      width: '32px',
      height: '32px',
      marginRight: '4px',
      marginLeft: props.type === 'neutral' ? '32px' : 0,
      appearance: 'none',
      outline: '0',
      border: '0',
      borderRadius: '3px',
      background: 'transparent',
      backgroundColor: colors[props.type] || '#000',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '50%',
      backgroundImage: `url(${icons[props.icon]})`,
      cursor: 'pointer'
    }}
    {...props}
  />
)

const AdminWidgetWrapper = styled.div`
  ${(props) => `
    &:hover {
      position: relative;
      box-shadow: inset 0 0 0 1px ${props.theme.borderColor};

      & > div[data-toolbar] { display: flex; }
    }
  `}
`

const AdminWidgetToolbar = styled.div`
  display: none;
  position: absolute;
  top: ${em(1)};
  left: ${em(1)};
  z-index: 9;
`

const AdminWidget = ({ library, identifier, widget, onEdit, onDelete }) => {
  const currentWidget = library[widget.component]

  const handleDeleteWidget = () => {
    if (!confirm('Are you sure?')) return

    onDelete(widget.widgetId)
  }

  const handleCopyWidget = () => {
    const storedWidget = JSON.stringify({
      widgetName: widget.component,
      widget
    })

    window.localStorage.setItem(`clipboard–${identifier}`, storedWidget)
  }

  return (
    <AdminWidgetWrapper>
      <AdminWidgetToolbar data-toolbar>
        <IconButton icon='iconMove' data-drag />
        <IconButton
          icon='iconEdit'
          type='primary'
          onClick={() => onEdit(widget)}
        />
        <IconButton
          icon='iconDelete'
          type='danger'
          onClick={() => handleDeleteWidget(widget.widgetId)}
        />
        <IconButton icon='iconCopy' type='neutral' onClick={handleCopyWidget} />
      </AdminWidgetToolbar>

      {React.createElement(currentWidget, widget.settings)}
    </AdminWidgetWrapper>
  )
}

AdminWidget.defaultProps = {
  containerSettings: {}
}

export default AdminWidget
