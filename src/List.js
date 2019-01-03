import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SortableList from 'react-sortablejs';
import {
  em,
  Button,
} from 'raketa-ui';

import {
  add,
  removeByIndex,
  updateFieldByIndex,
  reorder,
  randomId,
} from './lists';

const Handle = (props) => <img {...props} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItbW9yZS12ZXJ0aWNhbCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTIiIGN5PSI1IiByPSIxIj48L2NpcmNsZT48Y2lyY2xlIGN4PSIxMiIgY3k9IjE5IiByPSIxIj48L2NpcmNsZT48L3N2Zz4=" />;
const IconDelete = () => <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItdHJhc2giPjxwb2x5bGluZSBwb2ludHM9IjMgNiA1IDYgMjEgNiI+PC9wb2x5bGluZT48cGF0aCBkPSJNMTkgNnYxNGEyIDIgMCAwIDEtMiAySDdhMiAyIDAgMCAxLTItMlY2bTMgMFY0YTIgMiAwIDAgMSAyLTJoNGEyIDIgMCAwIDEgMiAydjIiPjwvcGF0aD48L3N2Zz4=" />;

const ListItem = styled.div`
  margin-bottom: ${em(1)};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 3px;
`;

const ListItemToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  height: 38px;
  padding: 8px;
  background-color: #efefef;
  border-bottom: 1px solid ${props => props.theme.borderColor};
`;

const ListItemWrapper = styled.div`
  padding: 8px;
  ${props => props.minimized ? 'display: none' : ''}
`;

const ListButton = styled.button`
  -webkit-appearance: none;
  padding: 0;
  margin: 0;
  border: 0;
  outline: 0;
  background: transparent;
  cursor: pointer;
  margin-left: 8px;

  img { width: 16px; }
`;

const ItemTitle = styled.span`
  position: relative;
  top: -3px;
  margin-left: 2px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
`;

class List extends React.Component {
  static factory(items, template) {
    if (template) return Object.assign({}, template, { id: randomId() });
    if (!template && items.length === 0) throw 'List without a template needs the first element of the items to be present in order to reuse it for the creation of a new element';

    const item = Object.keys(items[0]).reduce(
      (obj, key) => Object.assign({}, obj, { [key]: '' }),
      {}
    );

    return Object.assign({}, item, { id: randomId() });
  }

  constructor(props) {
    super(props);

    this.state = {
      items: props.items || [],
    };

    if (!props.template) console.warn(`DEPRECATED: List without template: ${JSON.stringify(props.items)}`);
    if (!props.primaryField) console.warn(`DEPRECATED: List without primaryField: ${JSON.stringify(props.items)}`);
  }

  handleChangeField(idx, field, value) {
    this.setState({ items: updateFieldByIndex(this.state.items, field, value, idx) }, () => this.notifyChange());
  }

  notifyChange() {
    this.props.onChangeList('list', this.state.items);
  }

  handleAdd() {
    const { template } = this.props;
    const { items } = this.state;

    this.setState({ items: add(items, List.factory(items, template)) }, () => this.notifyChange());
  }

  handleReorder(order) {
    this.setState({ items: reorder(this.state.items, order) }, () => this.notifyChange());
  }

  handleRemove(idx) {
    const { template } = this.props;
    const { items } = this.state;
    if (!template && items.length === 1) return;

    this.setState({ items: removeByIndex(items, idx) }, () => this.notifyChange());
  }

  render() {
    const { template, listItem, primaryField } = this.props;
    const { items } = this.state;

    return (
      <div className="list">
        {!items &&
          <h4>There are no items yet.</h4>}

        {items && (
          <SortableList
            tag="div"
            options={{ handle: '[data-drag]', animation: 150 }}
            onChange={newOrder => this.handleReorder(newOrder)}
          >
            {items.map((item, idx) => (
              <ListItem key={item.id} data-id={idx}>
                <ListItemToolbar>
                  <div>
                    <Handle data-drag style={{ display: 'inline-block', width: '16px', cursor: 'move' }} />
                    <ItemTitle>{primaryField ? item[primaryField] : `Item ${idx + 1}`}</ItemTitle>
                  </div>

                  <div>
                    {(template || (!template && items.length !== 1)) && (
                      <ListButton type="button" danger onClick={() => this.handleRemove(idx)}>
                        <IconDelete />
                      </ListButton>
                    )}
                  </div>
                </ListItemToolbar>

                <ListItemWrapper>
                  {listItem(
                    item,
                    (field, value) => this.handleChangeField(idx, field, value),
                    idx
                  )}
                </ListItemWrapper>
              </ListItem>
            ))}
          </SortableList>
        )}

        <Button type="button" sm success onClick={() => this.handleAdd()}>Add Item</Button>
      </div>
    );
  }
}

List.defaultProps = {
  items: [],
};

List.propTypes = {
  items: PropTypes.array.isRequired,
  onChangeList: PropTypes.func.isRequired,
  listItem: PropTypes.func.isRequired,
  primaryField: PropTypes.any,
};

export default List;
