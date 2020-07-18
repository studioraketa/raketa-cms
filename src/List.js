import React from 'react'
import styled from 'styled-components'
import { ReactSortable } from 'react-sortablejs'
import { Button } from '@raketa-cms/raketa-mir'

import { add, removeByIndex, updateFieldByIndex, randomId } from './lists'

const ListWrapper = styled.div`
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
      style={{ width: '16px' }}
    />
  </span>
)
const IconDelete = () => (
  <img
    src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItdHJhc2giPjxwb2x5bGluZSBwb2ludHM9IjMgNiA1IDYgMjEgNiI+PC9wb2x5bGluZT48cGF0aCBkPSJNMTkgNnYxNGEyIDIgMCAwIDEtMiAySDdhMiAyIDAgMCAxLTItMlY2bTMgMFY0YTIgMiAwIDAgMSAyLTJoNGEyIDIgMCAwIDEgMiAydjIiPjwvcGF0aD48L3N2Zz4='
    style={{ width: '16px' }}
  />
)

const Item = styled.div`
  margin-bottom: ${(props) => props.theme.font.base};
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 3px;
`

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
  background-color: #efefef;
`

const ContentWrapper = styled.div`
  padding: 8px;
`

const ListButton = styled.button`
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
  position: relative;
  top: -3px;
  margin-left: 2px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
`

const List = ({
  items: defaultItems,
  listItem,
  template,
  primaryField,
  onChangeList
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

  return (
    <ListWrapper>
      {!items && <h4>There are no items yet.</h4>}

      {items && (
        <ReactSortable
          list={items}
          setList={handleReorder}
          handle='[data-drag]'
          direction='horizontal'
          dragoverBubble
        >
          {items.map((item, idx) => (
            <Item key={item.id} data-id={idx}>
              <TitleWrapper>
                <div>
                  <Handle />
                  <Title>
                    {primaryField ? item[primaryField] : `Item ${idx + 1}`}
                  </Title>
                </div>

                {(template || (!template && items.length !== 1)) && (
                  <ListButton
                    type='button'
                    danger
                    onClick={() => handleRemove(idx)}
                  >
                    <IconDelete />
                  </ListButton>
                )}
              </TitleWrapper>

              <ContentWrapper>
                {listItem(
                  item,
                  (field, value) => handleChangeField(idx, field, value),
                  idx
                )}
              </ContentWrapper>
            </Item>
          ))}
        </ReactSortable>
      )}

      <Button type='button' size='sm' variant='success' onClick={handleAdd}>
        Add item
      </Button>
    </ListWrapper>
  )
}

List.defaultProps = {
  items: []
}

export default List
