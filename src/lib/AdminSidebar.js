import React from 'react'
import { H } from '@raketa-cms/raketa-mir'

import {
  SideNav,
  NavItem,
  NavGroup,
  NavButton,
  NavPanel,
  SideNavSearchWrapper
} from '../lib/SideNav'

import LanguageSwitcher from '../lib/LanguageSwitcher'

import { SidebarItem } from '../lib/SidebarItem'
import TextInput from '../forms/TextInput'
import LibraryContext from '../LibraryContext'
import widgetData from '../helpers/widgetData'

const ICONS = {
  add:
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMnB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAyMiAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5wbHVzLWNpcmNsZTwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJwbHVzLWNpcmNsZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4gICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEuMDAwMDAwLCAxLjAwMDAwMCkiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIj4gICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBjeD0iMTAiIGN5PSIxMCIgcj0iMTAiPjwvY2lyY2xlPiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMCw2IEwxMCwxNCIgaWQ9IlNoYXBlIj48L3BhdGg+ICAgICAgICAgICAgPHBhdGggZD0iTTYsMTAgTDE0LDEwIiBpZD0iU2hhcGUiPjwvcGF0aD4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg==',
  reorder:
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMnB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAyMiAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5saXN0PC90aXRsZT4gICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+ICAgIDxkZWZzPjwvZGVmcz4gICAgPGcgaWQ9Imxpc3QiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNy4wMDAwMDAsIDUuMDAwMDAwKSIgaWQ9IlNoYXBlIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIj4gICAgICAgICAgICA8cGF0aCBkPSJNMCwwIEwxMywwIj48L3BhdGg+ICAgICAgICAgICAgPHBhdGggZD0iTTAsNiBMMTMsNiI+PC9wYXRoPiAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDEyIEwxMywxMiI+PC9wYXRoPiAgICAgICAgPC9nPiAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC0yIiBmaWxsPSIjRkZGRkZGIiBjeD0iMyIgY3k9IjUiIHI9IjEiPjwvY2lyY2xlPiAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC0yIiBmaWxsPSIjRkZGRkZGIiBjeD0iMyIgY3k9IjE3IiByPSIxIj48L2NpcmNsZT4gICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMiIgZmlsbD0iI0ZGRkZGRiIgY3g9IjMiIGN5PSIxMSIgcj0iMSI+PC9jaXJjbGU+ICAgIDwvZz48L3N2Zz4=',
  save:
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMnB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAyMiAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5jaGVjazwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJjaGVjayIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4gICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuMDAwMDAwLCA2LjAwMDAwMCkiIGlkPSJTaGFwZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiPiAgICAgICAgICAgIDxwb2x5bGluZSBwb2ludHM9IjE2IDAgNSAxMSAwIDYiPjwvcG9seWxpbmU+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=',
  paste:
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAxOCAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5jbGlwYm9hcmQ8L3RpdGxlPiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4gICAgICAgIDxnIGlkPSJjbGlwYm9hcmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEuMDAwMDAwLCAxLjAwMDAwMCkiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIj4gICAgICAgICAgICA8ZyBpZD0iY2xpcGJvYXJkLXdoaXRlIj4gICAgICAgICAgICAgICAgPHBhdGggZD0iTTEyLDIgTDE0LDIgQzE1LjEwNDU2OTUsMiAxNiwyLjg5NTQzMDUgMTYsNCBMMTYsMTggQzE2LDE5LjEwNDU2OTUgMTUuMTA0NTY5NSwyMCAxNCwyMCBMMiwyMCBDMC44OTU0MzA1LDIwIDAsMTkuMTA0NTY5NSAwLDE4IEwwLDQgQzAsMi44OTU0MzA1IDAuODk1NDMwNSwyIDIsMiBMNCwyIiBpZD0iUGF0aCI+PC9wYXRoPiAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiB4PSI0IiB5PSIwIiB3aWR0aD0iOCIgaGVpZ2h0PSI0IiByeD0iMSI+PC9yZWN0PiAgICAgICAgICAgIDwvZz4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg==',
  exit:
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMnB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAyMiAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5jaGV2cm9ucy1sZWZ0PC90aXRsZT4gICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+ICAgIDxkZWZzPjwvZGVmcz4gICAgPGcgaWQ9ImNoZXZyb25zLWxlZnQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+ICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1LjAwMDAwMCwgNi4wMDAwMDApIiBpZD0iU2hhcGUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIj4gICAgICAgICAgICA8cG9seWxpbmUgcG9pbnRzPSI1IDEwIDAgNSA1IDAiPjwvcG9seWxpbmU+ICAgICAgICAgICAgPHBvbHlsaW5lIHBvaW50cz0iMTIgMTAgNyA1IDEyIDAiPjwvcG9seWxpbmU+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=',
  settings:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjciIGhlaWdodD0iMjciIHZpZXdCb3g9IjAgMCAyNyAyNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjI5MyAyNS4wMTE3QzEzLjU5NzcgMjUuMDExNyAxMy44OTA2IDI0Ljk3NjUgMTQuMjA3IDI0Ljk1MzFMMTQuODc1IDI2LjI0MjJDMTUuMDAzOSAyNi41IDE1LjI2MTcgMjYuNjQwNiAxNS41ODk4IDI2LjU5MzdDMTUuODgyOCAyNi41MzUxIDE2LjA4MiAyNi4zMjQyIDE2LjEyODkgMjYuMDA3OEwxNi4zMjgxIDI0LjU4OThDMTYuOTE0MSAyNC40Mzc1IDE3LjQ4ODMgMjQuMjE0OCAxOC4wMzkxIDIzLjk2ODdMMTkuMDkzOCAyNC45MTc5QzE5LjMxNjQgMjUuMTI4OSAxOS41OTc3IDI1LjE3NTcgMTkuODkwNiAyNS4wMTE3QzIwLjE0ODQgMjQuODcxMSAyMC4yNTM5IDI0LjU4OTggMjAuMTk1MyAyNC4yODUxTDE5LjkwMjMgMjIuODc4OUMyMC4zOTQ1IDIyLjUzOSAyMC44NzUgMjIuMTUyMyAyMS4zMDg2IDIxLjcxODdMMjIuNjA5NCAyMi4yNjk1QzIyLjkwMjMgMjIuMzg2NyAyMy4xODM2IDIyLjMyODEgMjMuNDA2MiAyMi4wNTg2QzIzLjYwNTUgMjEuODQ3NiAyMy42Mjg5IDIxLjU0MjkgMjMuNDUzMSAyMS4yODUxTDIyLjY5MTQgMjAuMDY2NEMyMy4wNDMgMTkuNTc0MiAyMy4zMjQyIDE5LjA0NjggMjMuNTkzOCAxOC40ODQzTDI1LjAzNTIgMTguNTU0N0MyNS4zMzk4IDE4LjU2NjQgMjUuNTg1OSAxOC40MDIzIDI1LjY5MTQgMTguMTA5M0MyNS43ODUyIDE3LjgxNjQgMjUuNzAzMSAxNy41MzUxIDI1LjQ1NyAxNy4zNDc2TDI0LjMzMiAxNi40NTdDMjQuNDg0NCAxNS44OTQ1IDI0LjYwMTYgMTUuMjg1MSAyNC42NjAyIDE0LjY1MjNMMjYuMDA3OCAxNC4yMzA0QzI2LjMxMjUgMTQuMTI1IDI2LjQ4ODMgMTMuOTAyMyAyNi40ODgzIDEzLjU4NTlDMjYuNDg4MyAxMy4yODEyIDI2LjMxMjUgMTMuMDU4NiAyNi4wMDc4IDEyLjk1MzFMMjQuNjYwMiAxMi41MTk1QzI0LjYwMTYgMTEuODg2NyAyNC40ODQ0IDExLjMwMDcgMjQuMzMyIDEwLjcyNjVMMjUuNDU3IDkuODI0MTlDMjUuNjkxNCA5LjY0ODQxIDI1Ljc4NTIgOS4zNzg4NyAyNS42OTE0IDkuMDg1OTFDMjUuNTg1OSA4Ljc5Mjk0IDI1LjMzOTggOC42Mjg4NyAyNS4wMzUyIDguNjQwNTlMMjMuNTkzOCA4LjY5OTE5QzIzLjMyNDIgOC4xMzY2OSAyMy4wNDMgNy42MDkzNCAyMi42OTE0IDcuMTE3MTZMMjMuNDUzMSA1Ljg5ODQxQzIzLjYxNzIgNS42NTIzMSAyMy41OTM4IDUuMzQ3NjIgMjMuNDA2MiA1LjEzNjY5QzIzLjE4MzYgNC44NjcxNiAyMi45MDIzIDQuNzk2ODQgMjIuNjA5NCA0LjkyNTc1TDIxLjMwODYgNS40NTMwOUMyMC44NzUgNS4wNDI5NCAyMC4zOTQ1IDQuNjQ0NSAxOS45MDIzIDQuMzA0NjZMMjAuMTk1MyAyLjkxMDEyQzIwLjI1MzkgMi41OTM3MiAyMC4xNDg0IDIuMzEyNDcgMTkuODkwNiAyLjE3MTg0QzE5LjU5NzcgMi4wMTk1IDE5LjMxNjQgMi4wNDI5NCAxOS4wOTM4IDIuMjc3MzFMMTguMDM5MSAzLjIwMzA5QzE3LjQ4ODMgMi45NTcgMTYuOTE0MSAyLjc1Nzc4IDE2LjMyODEgMi41OTM3MkwxNi4xMjg5IDEuMTc1NzVDMTYuMDgyIDAuODcxMDYxIDE1Ljg3MTEgMC42NDg0MDUgMTUuNTc4MSAwLjYwMTUzQzE1LjI2MTcgMC41NTQ2NTUgMTUuMDAzOSAwLjY4MzU2MSAxNC44NzUgMC45NDEzNzRMMTQuMjA3IDIuMjMwNDRDMTMuODkwNiAyLjIwNyAxMy41OTc3IDIuMTgzNTYgMTMuMjkzIDIuMTgzNTZDMTIuOTc2NiAyLjE4MzU2IDEyLjY5NTMgMi4yMDcgMTIuMzc4OSAyLjIzMDQ0TDExLjY5OTIgMC45NDEzNzRDMTEuNTcwMyAwLjY4MzU2MSAxMS4zMTI1IDAuNTU0NjU1IDEwLjk5NjEgMC42MDE1M0MxMC43MDMxIDAuNjQ4NDA1IDEwLjQ5MjIgMC44NzEwNjEgMTAuNDU3IDEuMTc1NzVMMTAuMjQ2MSAyLjU4MkM5LjY2MDE2IDIuNzU3NzggOS4wOTc2NiAyLjk1NyA4LjUzNTE2IDMuMjAzMDlMNy40ODA0NyAyLjI3NzMxQzcuMjU3ODEgMi4wNDI5NCA2Ljk3NjU2IDIuMDE5NSA2LjY4MzU5IDIuMTcxODRDNi40MjU3OCAyLjMxMjQ3IDYuMzIwMzEgMi41OTM3MiA2LjM3ODkxIDIuOTEwMTJMNi42NzE4OCA0LjMwNDY2QzYuMTkxNDEgNC42NDQ1IDUuNjk5MjIgNS4wNDI5NCA1LjI2NTYyIDUuNDUzMDlMMy45NjQ4NCA0LjkyNTc1QzMuNjcxODggNC43OTY4NCAzLjQwMjM0IDQuODY3MTYgMy4xNzk2OSA1LjEzNjY5QzIuOTgwNDcgNS4zNDc2MiAyLjk1NzAzIDUuNjUyMzEgMy4xMjEwOSA1Ljg4NjY5TDMuODgyODEgNy4xMTcxNkMzLjU0Mjk3IDcuNjA5MzQgMy4yNSA4LjEzNjY5IDIuOTgwNDcgOC42OTkxOUwxLjU1MDc4IDguNjQwNTlDMS4yNDYwOSA4LjYyODg3IDAuOTg4MjgxIDguNzkyOTQgMC44ODI4MTIgOS4wODU5MUMwLjc4OTA2MiA5LjM3ODg3IDAuODcxMDk0IDkuNjQ4NDEgMS4xMTcxOSA5LjgyNDE5TDIuMjQyMTkgMTAuNzI2NUMyLjA4OTg0IDExLjMwMDcgMS45NzI2NiAxMS44ODY3IDEuOTM3NSAxMi41MTk1TDAuNTY2NDA2IDEyLjk1MzFDMC4yNjE3MTkgMTMuMDQ2OCAwLjA5NzY1NjIgMTMuMjY5NSAwLjA5NzY1NjIgMTMuNTg1OUMwLjA5NzY1NjIgMTMuOTAyMyAwLjI2MTcxOSAxNC4xMjUgMC41NjY0MDYgMTQuMjMwNEwxLjkzNzUgMTQuNjY0QzEuOTcyNjYgMTUuMjg1MSAyLjA4OTg0IDE1Ljg5NDUgMi4yNDIxOSAxNi40NTdMMS4xMTcxOSAxNy4zNDc2QzAuODgyODEyIDE3LjUzNTEgMC44MDA3ODEgMTcuODE2NCAwLjg4MjgxMiAxOC4xMDkzQzAuOTg4MjgxIDE4LjQwMjMgMS4yNDYwOSAxOC41NjY0IDEuNTUwNzggMTguNTU0N0wyLjk4MDQ3IDE4LjQ4NDNDMy4yNSAxOS4wNDY4IDMuNTQyOTcgMTkuNTc0MiAzLjg4MjgxIDIwLjA2NjRMMy4xMjEwOSAyMS4yODUxQzIuOTU3MDMgMjEuNTQyOSAyLjk4MDQ3IDIxLjg0NzYgMy4xNzk2OSAyMi4wNTg2QzMuNDAyMzQgMjIuMzI4MSAzLjY3MTg4IDIyLjM4NjcgMy45NjQ4NCAyMi4yNjk1TDUuMjY1NjIgMjEuNzE4N0M1LjY5OTIyIDIyLjE1MjMgNi4xOTE0MSAyMi41MzkgNi42NzE4OCAyMi44Nzg5TDYuMzc4OTEgMjQuMjg1MUM2LjMyMDMxIDI0LjU4OTggNi40MjU3OCAyNC44NzExIDYuNjgzNTkgMjUuMDExN0M2Ljk3NjU2IDI1LjE3NTcgNy4yNTc4MSAyNS4xMjg5IDcuNDgwNDcgMjQuOTE3OUw4LjUzNTE2IDIzLjk2ODdDOS4wOTc2NiAyNC4yMTQ4IDkuNjYwMTYgMjQuNDM3NSAxMC4yNDYxIDI0LjU4OThMMTAuNDU3IDI2LjAwNzhDMTAuNDkyMiAyNi4zMjQyIDEwLjcwMzEgMjYuNTM1MSAxMC45OTYxIDI2LjU5MzdDMTEuMzEyNSAyNi42NDA2IDExLjU3MDMgMjYuNSAxMS42OTkyIDI2LjI0MjJMMTIuMzc4OSAyNC45NTMxQzEyLjY4MzYgMjQuOTc2NSAxMi45NzY2IDI1LjAxMTcgMTMuMjkzIDI1LjAxMTdaTTE2LjIzNDQgMTIuODQ3NkMxNS42OTUzIDExLjM3MTEgMTQuNjA1NSAxMC41NjI1IDEzLjI2OTUgMTAuNTYyNUMxMy4wNTg2IDEwLjU2MjUgMTIuODM1OSAxMC41ODU5IDEyLjQ0OTIgMTAuNjY3OUw5LjA4NTk0IDQuOTI1NzVDMTAuMzUxNiA0LjMwNDY2IDExLjc2OTUgMy45NjQ4MSAxMy4yOTMgMy45NjQ4MUMxOC40MDIzIDMuOTY0ODEgMjIuNDEwMiA3Ljg0MzcyIDIyLjc4NTIgMTIuODQ3NkgxNi4yMzQ0Wk0zLjc3NzM0IDEzLjU5NzZDMy43NzczNCAxMC4zMzk4IDUuMzI0MjIgNy40Njg3MiA3LjczODI4IDUuNzM0MzRMMTEuMTM2NyAxMS41MTE3QzEwLjQ5MjIgMTIuMTY3OSAxMC4xOTkyIDEyLjg4MjggMTAuMTk5MiAxMy42NDQ1QzEwLjE5OTIgMTQuMzgyOCAxMC40ODA1IDE1LjA2MjUgMTEuMTI1IDE1Ljc0MjJMNy42Njc5NyAyMS40MTRDNS4yODkwNiAxOS42Njc5IDMuNzc3MzQgMTYuODMyIDMuNzc3MzQgMTMuNTk3NlpNMTEuODYzMyAxMy42MzI4QzExLjg2MzMgMTIuODM1OSAxMi41MzEyIDEyLjIxNDggMTMuMjkzIDEyLjIxNDhDMTQuMDc4MSAxMi4yMTQ4IDE0LjczNDQgMTIuODM1OSAxNC43MzQ0IDEzLjYzMjhDMTQuNzM0NCAxNC40MTc5IDE0LjA3ODEgMTUuMDYyNSAxMy4yOTMgMTUuMDYyNUMxMi41MzEyIDE1LjA2MjUgMTEuODYzMyAxNC40MTc5IDExLjg2MzMgMTMuNjMyOFpNMTMuMjkzIDIzLjIzMDRDMTEuNzM0NCAyMy4yMzA0IDEwLjI4MTIgMjIuODY3MiA5LjAwMzkxIDIyLjIzNDNMMTIuNDQ5MiAxNi41OTc2QzEyLjgxMjUgMTYuNjkxNCAxMy4wNTg2IDE2LjcxNDggMTMuMjY5NSAxNi43MTQ4QzE0LjYxNzIgMTYuNzE0OCAxNS43MDcgMTUuODgyOCAxNi4yMzQ0IDE0LjM3MTFIMjIuNzczNEMyMi4zOTg0IDE5LjM1MTUgMTguNDAyMyAyMy4yMzA0IDEzLjI5MyAyMy4yMzA0WiIgZmlsbD0iI0Y5RkFGQiIvPgo8L3N2Zz4K',
  publish:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjciIGhlaWdodD0iMjciIHZpZXdCb3g9IjAgMCAyNyAyNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuMzA4NiAyMy42OTkySDguODUxNTdDOS4wODU5NCAyMy42OTkyIDkuMjYxNzIgMjMuNzY5NSA5LjQzNzUgMjMuOTQ1M0wxMS4yNDIyIDI1LjczODNDMTIuNzE4OCAyNy4yMjY2IDE0LjA4OTggMjcuMjE0OCAxNS41NjY0IDI1LjczODNMMTcuMzcxMSAyMy45NDUzQzE3LjU1ODYgMjMuNzY5NSAxNy43MjI3IDIzLjY5OTIgMTcuOTY4OCAyMy42OTkySDIwLjVDMjIuNTk3NyAyMy42OTkyIDIzLjU3MDMgMjIuNzM4MyAyMy41NzAzIDIwLjYyODlWMTguMDk3N0MyMy41NzAzIDE3Ljg1MTYgMjMuNjQwNiAxNy42ODc1IDIzLjgxNjQgMTcuNUwyNS42MDk0IDE1LjY5NTNDMjcuMDk3NyAxNC4yMTg4IDI3LjA4NTkgMTIuODQ3NyAyNS42MDk0IDExLjM3MTFMMjMuODE2NCA5LjU2NjQxQzIzLjY0MDYgOS4zOTA2MyAyMy41NzAzIDkuMjE0ODUgMjMuNTcwMyA4Ljk4MDQ3VjYuNDM3NUMyMy41NzAzIDQuMzUxNTcgMjIuNjA5NCAzLjM2NzE5IDIwLjUgMy4zNjcxOUgxNy45Njg4QzE3LjcyMjcgMy4zNjcxOSAxNy41NTg2IDMuMzA4NiAxNy4zNzExIDMuMTMyODJMMTUuNTY2NCAxLjMzOTg1QzE0LjA4OTggLTAuMTQ4NDMzIDEyLjcxODggLTAuMTM2NzE0IDExLjI0MjIgMS4zMzk4NUw5LjQzNzUgMy4xMzI4MkM5LjI2MTcyIDMuMzA4NiA5LjA4NTk0IDMuMzY3MTkgOC44NTE1NyAzLjM2NzE5SDYuMzA4NkM0LjIxMDk0IDMuMzY3MTkgMy4yMzgyOSA0LjMyODEzIDMuMjM4MjkgNi40Mzc1VjguOTgwNDdDMy4yMzgyOSA5LjIxNDg1IDMuMTc5NjkgOS4zOTA2MyAzLjAwMzkxIDkuNTY2NDFMMS4yMTA5NCAxMS4zNzExQy0wLjI3NzMzOSAxMi44NDc3IC0wLjI2NTYyMSAxNC4yMTg4IDEuMjEwOTQgMTUuNjk1M0wzLjAwMzkxIDE3LjVDMy4xNzk2OSAxNy42ODc1IDMuMjM4MjkgMTcuODUxNiAzLjIzODI5IDE4LjA5NzdWMjAuNjI4OUMzLjIzODI5IDIyLjcyNjYgNC4yMTA5NCAyMy42OTkyIDYuMzA4NiAyMy42OTkyWk0xMi4wOTc3IDE5LjI1NzhDMTEuNjk5MiAxOS4yNTc4IDExLjM3MTEgMTkuMTA1NSAxMS4wNjY0IDE4LjY5NTNMOC4xMjUgMTUuMDg1OUM3Ljk0OTIyIDE0Ljg1MTYgNy44NDM3NSAxNC41ODIgNy44NDM3NSAxNC4zMjQyQzcuODQzNzUgMTMuNzg1MiA4LjI1MzkxIDEzLjM1MTYgOC43OTI5NyAxMy4zNTE2QzkuMTIxMSAxMy4zNTE2IDkuMzc4OTEgMTMuNDY4OCA5LjY3MTg4IDEzLjg1NTVMMTIuMDUwOCAxNi45MjU4TDE3LjA1NDcgOC44ODY3MkMxNy4yNzczIDguNTIzNDQgMTcuNTgyIDguMzQ3NjYgMTcuODk4NCA4LjM0NzY2QzE4LjQwMjMgOC4zNDc2NiAxOC44ODI4IDguNjk5MjIgMTguODgyOCA5LjIzODI5QzE4Ljg4MjggOS41MDc4MiAxOC43MzA1IDkuNzc3MzUgMTguNTg5OCAxMC4wMTE3TDEzLjA4MiAxOC42OTUzQzEyLjgzNTkgMTkuMDcwMyAxMi40OTYxIDE5LjI1NzggMTIuMDk3NyAxOS4yNTc4WiIgZmlsbD0iI0Y5RkFGQiIvPgo8L3N2Zz4K'
}

const sortByTitle = (a, b) => {
  var nameA = a.widgetTitle.toUpperCase()
  var nameB = b.widgetTitle.toUpperCase()

  if (nameA < nameB) return -1
  if (nameA > nameB) return 1

  return 0
}

const WidgetsList = ({ library, onAddWidget }) => {
  const [q, setQ] = React.useState('')

  const widgets = Object.keys(library)
    .filter((widgetName) => !widgetData.deprecated(library[widgetName]))
    .filter((widgetName) => {
      return (
        widgetData
          .title(library[widgetName])
          .toLowerCase()
          .indexOf(q.toLowerCase()) !== -1
      )
    })

  const widgetsCategories = widgets
    .map((widgetName) => widgetData.category(library[widgetName]))
    .filter((c, idx, self) => self.indexOf(c) === idx)

  return (
    <div>
      <SideNavSearchWrapper>
        <TextInput value={q} onChange={setQ} placeholder='Search...' />
      </SideNavSearchWrapper>

      {widgetsCategories.map((categoryName, idx) => (
        <div key={idx} style={{ marginBottom: '25px' }}>
          <H size='medium' style={{ color: '#fff' }}>
            {categoryName}
          </H>

          {widgets
            .filter(
              (widgetName) =>
                widgetData.category(library[widgetName]) === categoryName
            )
            .map((widgetName) => ({
              widgetName,
              widgetTitle: widgetData.title(library[widgetName])
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

const AdminSidebar = ({
  dirty,
  buttons,
  languageSwitcherSettings,
  onAddWidget,
  onReorderDialog,
  onPasteWidget,
  onSave,
  onExit
}) => {
  const { adminLibrary } = React.useContext(LibraryContext)

  return (
    <SideNav>
      <NavGroup>
        <NavItem>
          <NavButton icon={ICONS.add} />
          <NavPanel>
            <H size='large' style={{ color: '#fff' }}>
              Library
            </H>

            <WidgetsList library={adminLibrary} onAddWidget={onAddWidget} />
          </NavPanel>
        </NavItem>
        <NavItem>
          <NavButton
            tooltip='Reorder widgets'
            icon={ICONS.reorder}
            onClick={onReorderDialog}
          />
        </NavItem>
        <NavItem>
          <NavButton
            tooltip='Save page'
            icon={ICONS.save}
            success={dirty}
            onClick={onSave}
          />
        </NavItem>

        <NavItem>
          <NavButton
            tooltip='Paste widget'
            icon={ICONS.paste}
            onClick={onPasteWidget}
          />
        </NavItem>

        {buttons &&
          buttons.map((button) => (
            <NavItem key={button.id}>
              <NavButton
                id={button.id}
                tooltip={button.label}
                className={button.className}
                icon={ICONS[button.icon]}
                onClick={() => button.onClick()}
              >
                {ICONS[button.icon] ? '' : button.label}
              </NavButton>
            </NavItem>
          ))}
      </NavGroup>

      <NavGroup>
        {languageSwitcherSettings && (
          <NavItem>
            <LanguageSwitcher {...languageSwitcherSettings} />
          </NavItem>
        )}

        <NavItem>
          <NavButton tooltip='Exit' icon={ICONS.exit} onClick={onExit} />
        </NavItem>
      </NavGroup>
    </SideNav>
  )
}

export default AdminSidebar
