import React from 'react'
import styled from 'styled-components'
import { ReactSortable } from 'react-sortablejs'
import { reset, Button, P, H } from '@raketa-cms/raketa-mir'

import {
  add,
  addAtBeggining,
  removeByIndex,
  updateFieldByIndex,
  randomId
} from './lists'

const ListWrapper = styled.div`
  ${reset};
  margin-bottom: ${(props) => props.theme.font.base};
`

const AddButtonWrapepr = styled.div`
  ${reset};
  margin-bottom: ${(props) => props.theme.font.base};
`

const Handle = (props) => (
  <span
    data-drag
    style={{
      display: 'inline-block',
      width: '16px',
      cursor: 'move'
    }}
  >
    <img
      {...props}
      src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItbW9yZS12ZXJ0aWNhbCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTIiIGN5PSI1IiByPSIxIj48L2NpcmNsZT48Y2lyY2xlIGN4PSIxMiIgY3k9IjE5IiByPSIxIj48L2NpcmNsZT48L3N2Zz4='
      style={{
        position: 'relative',
        top: '3px',
        width: '16px'
      }}
    />
  </span>
)

const IconDelete = () => (
  <img
    src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItdHJhc2giPjxwb2x5bGluZSBwb2ludHM9IjMgNiA1IDYgMjEgNiI+PC9wb2x5bGluZT48cGF0aCBkPSJNMTkgNnYxNGEyIDIgMCAwIDEtMiAySDdhMiAyIDAgMCAxLTItMlY2bTMgMFY0YTIgMiAwIDAgMSAyLTJoNGEyIDIgMCAwIDEgMiAydjIiPjwvcGF0aD48L3N2Zz4='
    style={{ width: '16px' }}
  />
)

const IconMaximize = () => (
  <img
    src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tZG93biI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+'
    style={{ width: '16px' }}
  />
)

const IconMinimize = () => (
  <img
    src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tdXAiPjxwb2x5bGluZSBwb2ludHM9IjE4IDE1IDEyIDkgNiAxNSI+PC9wb2x5bGluZT48L3N2Zz4='
    style={{ width: '16px' }}
  />
)

const ItemWrapper = styled.div`
  ${reset};
  margin-bottom: ${(props) => props.theme.font.base};
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 5px;
`

const TitleWrapper = styled.div`
  ${reset};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
  padding: 8px;
  background-color: #efefef;
`

const ContentWrapper = styled.div`
  ${reset};
  padding: 8px;
`

const ListButton = styled.button`
  ${reset};
  position: relative;
  top: 2px;
  -webkit-appearance: none;
  padding: 0;
  margin: 0;
  border: 0;
  outline: 0;
  background: transparent;
  cursor: pointer;
  margin-left: 8px;
`

const Title = styled.span`
  ${reset};
  margin-left: 0.5em;
  font-weight: 700;
`

const extractPrimaryField = (primaryField, item, idx) => {
  if (!primaryField) {
    return `Item ${idx + 1}`
  }

  const keys = primaryField.split('.')

  if (keys.length === 1) {
    return item[primaryField]
  }

  return primaryField.split('.').reduce((acc, key) => {
    const newValue = (acc && acc[key]) || ''

    return newValue
  }, item)
}

const Item = ({
  idx,
  items,
  item,
  alwaysOpened,
  primaryField,
  template,
  handleRemove,
  handleChangeField,
  listItem
}) => {
  const [open, setOpen] = React.useState(alwaysOpened)

  return (
    <ItemWrapper>
      <TitleWrapper>
        <div>
          <Handle />
          <Title>{extractPrimaryField(primaryField, item, idx)}</Title>
        </div>

        <div>
          {!alwaysOpened && (
            <ListButton type='button' danger onClick={() => setOpen(!open)}>
              {open ? <IconMinimize /> : <IconMaximize />}
            </ListButton>
          )}

          {(template || (!template && items.length !== 1)) && (
            <ListButton type='button' danger onClick={() => handleRemove(idx)}>
              <IconDelete />
            </ListButton>
          )}
        </div>
      </TitleWrapper>

      {(alwaysOpened || open) && (
        <ContentWrapper>
          {listItem(
            item,
            (field, value) => handleChangeField(idx, field, value),
            idx
          )}
        </ContentWrapper>
      )}
    </ItemWrapper>
  )
}

const List = ({
  label,
  items: defaultItems,
  listItem,
  template,
  primaryField,
  onChangeList,
  itemsAlwaysOpen = false
}) => {
  const [items, setItems] = React.useState(defaultItems)

  const factory = (template) => {
    if (!template) throw new Error('Template not specified for this list')

    return Object.assign({}, template, { id: randomId() })
  }

  const handleChangeField = (idx, field, value) => {
    const newItems = updateFieldByIndex(items, field, value, idx)

    setItems(newItems)

    notifyChange(newItems)
  }

  const notifyChange = (items) => {
    onChangeList('list', items)
  }

  const handleAdd = () => {
    const newItems = add(items, factory(template))

    setItems(newItems)

    notifyChange(newItems)
  }

  const handleAddAtBeggining = () => {
    const newItems = addAtBeggining(items, factory(template))

    setItems(newItems)

    notifyChange(newItems)
  }

  const handleReorder = (items) => {
    setItems(items)

    notifyChange(items)
  }

  const handleRemove = (idx) => {
    if (!template && items.length === 1) return

    const newItems = removeByIndex(items, idx)

    setItems(newItems)

    notifyChange(newItems)
  }

  if (!primaryField) console.warn('No primaryField provided for a list', items)
  if (!label) console.warn('No label provided for a list', items)

  return (
    <ListWrapper>
      {label && (
        <H size='base' style={{ fontWeight: 700 }}>
          {label}
        </H>
      )}

      {items.length === 0 && <P>There are no items yet.</P>}

      {items.length > 0 && (
        <React.Fragment>
          <AddButtonWrapepr>
            <Button
              type='button'
              variant='success'
              onClick={handleAddAtBeggining}
            >
              Add item
            </Button>
          </AddButtonWrapepr>

          <ReactSortable
            list={items}
            setList={handleReorder}
            handle='[data-drag]'
            direction='horizontal'
            dragoverBubble
          >
            {items.map((item, idx) => (
              <Item
                key={item.id}
                data-id={idx}
                idx={idx}
                items={items}
                item={item}
                alwaysOpened={itemsAlwaysOpen}
                primaryField={primaryField}
                template={template}
                handleRemove={handleRemove}
                handleChangeField={handleChangeField}
                listItem={listItem}
              />
            ))}
          </ReactSortable>
        </React.Fragment>
      )}

      <Button type='button' variant='success' onClick={handleAdd}>
        Add item
      </Button>
    </ListWrapper>
  )
}

List.defaultProps = {
  items: []
}

export default List
