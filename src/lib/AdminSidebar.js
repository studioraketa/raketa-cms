import React from 'react'

import {
  SideNav,
  NavItem,
  NavButton,
  NavPanel,
  NavSectionTitle,
  SideNavSearchWrapper
} from '../lib/SideNav'

import { SidebarItem } from '../lib/SidebarItem'
import TextInput from '../forms/TextInput'
import LibraryContext from '../LibraryContext'

const sortByTitle = (a, b) => {
  var nameA = a.widgetTitle.toUpperCase()
  var nameB = b.widgetTitle.toUpperCase()

  if (nameA < nameB) return -1
  if (nameA > nameB) return 1

  return 0
}

const AdminSidebar = ({
  identifier,
  dirty,
  buttons,
  onAddWidget,
  onReorderDialog,
  onPasteWidget,
  onSave,
  onExit
}) => {
  const library = React.useContext(LibraryContext)
  const [q, setQ] = React.useState('')

  const handlePasteWidget = () => {
    window.localStorage.getItem(`clipboard–${identifier}`)

    onPasteWidget()
  }

  const renderWidgets = () => {
    const widgets = Object.keys(library)
      .filter((widgetName) => !library[widgetName].deprecated)
      .filter((widgetName) => {
        return (
          library[widgetName].title.toLowerCase().indexOf(q.toLowerCase()) !==
          -1
        )
      })

    const widgetsCategories = widgets
      .map((widgetName) => library[widgetName].category)
      .filter((c, idx, self) => self.indexOf(c) === idx)

    return (
      <div>
        <SideNavSearchWrapper>
          <TextInput value={q} onChange={setQ} placeholder='Search...' />
        </SideNavSearchWrapper>

        {widgetsCategories.map((categoryName, idx) => (
          <div key={idx} style={{ marginBottom: '25px' }}>
            <NavSectionTitle secondary>{categoryName}</NavSectionTitle>

            {widgets
              .filter(
                (widgetName) => library[widgetName].category === categoryName
              )
              .map((widgetName) => ({
                widgetName,
                widgetTitle: library[widgetName].title
              }))
              .sort(sortByTitle)
              .map((item, idx) => (
                <SidebarItem
                  key={idx}
                  onClick={() => onAddWidget(item.widgetName)}
                >
                  {item.widgetTitle}
                </SidebarItem>
              ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <SideNav>
      <NavItem>
        <NavButton icon='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMnB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAyMiAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5wbHVzLWNpcmNsZTwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJwbHVzLWNpcmNsZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4gICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEuMDAwMDAwLCAxLjAwMDAwMCkiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIj4gICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBjeD0iMTAiIGN5PSIxMCIgcj0iMTAiPjwvY2lyY2xlPiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMCw2IEwxMCwxNCIgaWQ9IlNoYXBlIj48L3BhdGg+ICAgICAgICAgICAgPHBhdGggZD0iTTYsMTAgTDE0LDEwIiBpZD0iU2hhcGUiPjwvcGF0aD4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg==' />
        <NavPanel>
          <NavSectionTitle>Library</NavSectionTitle>
          {renderWidgets()}
        </NavPanel>
      </NavItem>
      <NavItem>
        <NavButton
          icon='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMnB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAyMiAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5saXN0PC90aXRsZT4gICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+ICAgIDxkZWZzPjwvZGVmcz4gICAgPGcgaWQ9Imxpc3QiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNy4wMDAwMDAsIDUuMDAwMDAwKSIgaWQ9IlNoYXBlIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIj4gICAgICAgICAgICA8cGF0aCBkPSJNMCwwIEwxMywwIj48L3BhdGg+ICAgICAgICAgICAgPHBhdGggZD0iTTAsNiBMMTMsNiI+PC9wYXRoPiAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDEyIEwxMywxMiI+PC9wYXRoPiAgICAgICAgPC9nPiAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC0yIiBmaWxsPSIjRkZGRkZGIiBjeD0iMyIgY3k9IjUiIHI9IjEiPjwvY2lyY2xlPiAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC0yIiBmaWxsPSIjRkZGRkZGIiBjeD0iMyIgY3k9IjE3IiByPSIxIj48L2NpcmNsZT4gICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMiIgZmlsbD0iI0ZGRkZGRiIgY3g9IjMiIGN5PSIxMSIgcj0iMSI+PC9jaXJjbGU+ICAgIDwvZz48L3N2Zz4='
          onClick={onReorderDialog}
        />
      </NavItem>
      <NavItem>
        <NavButton
          icon='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMnB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAyMiAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5jaGVjazwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJjaGVjayIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4gICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuMDAwMDAwLCA2LjAwMDAwMCkiIGlkPSJTaGFwZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiPiAgICAgICAgICAgIDxwb2x5bGluZSBwb2ludHM9IjE2IDAgNSAxMSAwIDYiPjwvcG9seWxpbmU+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4='
          success={dirty}
          onClick={onSave}
        />
      </NavItem>

      <NavItem>
        <NavButton
          icon='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAxOCAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5jbGlwYm9hcmQ8L3RpdGxlPiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4gICAgICAgIDxnIGlkPSJjbGlwYm9hcmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEuMDAwMDAwLCAxLjAwMDAwMCkiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIj4gICAgICAgICAgICA8ZyBpZD0iY2xpcGJvYXJkLXdoaXRlIj4gICAgICAgICAgICAgICAgPHBhdGggZD0iTTEyLDIgTDE0LDIgQzE1LjEwNDU2OTUsMiAxNiwyLjg5NTQzMDUgMTYsNCBMMTYsMTggQzE2LDE5LjEwNDU2OTUgMTUuMTA0NTY5NSwyMCAxNCwyMCBMMiwyMCBDMC44OTU0MzA1LDIwIDAsMTkuMTA0NTY5NSAwLDE4IEwwLDQgQzAsMi44OTU0MzA1IDAuODk1NDMwNSwyIDIsMiBMNCwyIiBpZD0iUGF0aCI+PC9wYXRoPiAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiB4PSI0IiB5PSIwIiB3aWR0aD0iOCIgaGVpZ2h0PSI0IiByeD0iMSI+PC9yZWN0PiAgICAgICAgICAgIDwvZz4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg=='
          onClick={handlePasteWidget}
        />
      </NavItem>

      {buttons &&
        buttons.map((button) => (
          <NavItem key={button.id}>
            <NavButton
              id={button.id}
              className={button.className}
              onClick={() => button.onClick()}
            >
              {button.label}
            </NavButton>
          </NavItem>
        ))}

      <NavItem bottom>
        <NavButton
          icon='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMnB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAyMiAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5jaGV2cm9ucy1sZWZ0PC90aXRsZT4gICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+ICAgIDxkZWZzPjwvZGVmcz4gICAgPGcgaWQ9ImNoZXZyb25zLWxlZnQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+ICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1LjAwMDAwMCwgNi4wMDAwMDApIiBpZD0iU2hhcGUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIj4gICAgICAgICAgICA8cG9seWxpbmUgcG9pbnRzPSI1IDEwIDAgNSA1IDAiPjwvcG9seWxpbmU+ICAgICAgICAgICAgPHBvbHlsaW5lIHBvaW50cz0iMTIgMTAgNyA1IDEyIDAiPjwvcG9seWxpbmU+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4='
          onClick={onExit}
        />
      </NavItem>
    </SideNav>
  )
}

export default AdminSidebar

// export default React.memo(
//   AdminSidebar,
//   (prevProps, nextProps) => prevProps.dirty === nextProps.dirty
// )
