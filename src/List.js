import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SortableList from 'react-sortablejs';

const Handle = (props) => <img {...props} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItbW9yZS12ZXJ0aWNhbCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTIiIGN5PSI1IiByPSIxIj48L2NpcmNsZT48Y2lyY2xlIGN4PSIxMiIgY3k9IjE5IiByPSIxIj48L2NpcmNsZT48L3N2Zz4=" />;
const IconDelete = () => <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItdHJhc2giPjxwb2x5bGluZSBwb2ludHM9IjMgNiA1IDYgMjEgNiI+PC9wb2x5bGluZT48cGF0aCBkPSJNMTkgNnYxNGEyIDIgMCAwIDEtMiAySDdhMiAyIDAgMCAxLTItMlY2bTMgMFY0YTIgMiAwIDAgMSAyLTJoNGEyIDIgMCAwIDEgMiAydjIiPjwvcGF0aD48L3N2Zz4=" />;
const IconMinus = () => <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItbWludXMtY2lyY2xlIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCI+PC9jaXJjbGU+PGxpbmUgeDE9IjgiIHkxPSIxMiIgeDI9IjE2IiB5Mj0iMTIiPjwvbGluZT48L3N2Zz4=" />;
const IconPlus = () => <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItcGx1cy1jaXJjbGUiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIj48L2NpcmNsZT48bGluZSB4MT0iMTIiIHkxPSI4IiB4Mj0iMTIiIHkyPSIxNiI+PC9saW5lPjxsaW5lIHgxPSI4IiB5MT0iMTIiIHgyPSIxNiIgeTI9IjEyIj48L2xpbmU+PC9zdmc+" />;

import {
  em,
  Button,
  IconButton,
  IconSpan,
} from 'raketa-ui';

const randomId = () => Math.floor(Math.random() * ((999 - 100) + 1)) + 100;

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
  static newItemFactory(firstItem) {
    const item = Object.keys(firstItem).reduce((obj, key) =>
      Object.assign({}, obj, { [key]: '' }));

    return Object.assign({}, item, { id: randomId() });
  }

  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items || [],
      minimizedItems: [],
    };
  }

  onChangeField(idx, field, value) {
    const newItems = [
      ...this.state.items.slice(0, idx),
      Object.assign({}, this.state.items[idx], { [field]: value }),
      ...this.state.items.slice(idx + 1),
    ];

    this.setState({ items: newItems }, () => this.notifyChange());
  }

  notifyChange() {
    this.props.onChangeList('list', this.state.items);
  }

  handleAddItem() {
    const newItems = [...this.state.items, List.newItemFactory(this.state.items[0])];

    this.setState({ items: newItems }, () => this.notifyChange());
  }

  handleReorder(newOrder) {
    const newItems = [];
    newOrder.forEach((i) => {
      newItems.push(this.state.items[i]);
    });

    this.setState({ items: newItems }, () => this.notifyChange());
  }

  handleRemoveItem(idx) {
    if (this.state.items.length === 1) return;

    const newItems = [...this.state.items.slice(0, idx), ...this.state.items.slice(idx + 1)];
    this.setState({ items: newItems }, () => this.notifyChange());
  }

  handleToggle(idx) {
    let { minimizedItems } = this.state;

    if (!minimizedItems.includes(idx)) {
      minimizedItems.push(idx);
    } else {
      const itemIdx = minimizedItems.findIndex(item => item === idx);

      minimizedItems = [
        ...minimizedItems.slice(0, itemIdx),
        ...minimizedItems.slice(itemIdx + 1),
      ];
    }

    this.setState({ minimizedItems });
  }

  renderItems() {
    if (this.state.items.length === 0) return (<h4>There are no items yet.</h4>);

    return this.state.items.map((item, idx) =>
      <ListItem key={item.id} data-id={idx}>
        <ListItemToolbar>
          <div>
            <Handle className="move btn-drag" style={{ width: '16px', marginLeft: '-4px', cursor: 'move' }} />
            <ItemTitle>{this.props.titleField !== '' ? item[this.props.titleField] : `Item ${idx + 1}`}</ItemTitle>
          </div>

          <div>
            <ListButton type="button" onClick={() => this.handleToggle(idx)}>
              {this.state.minimizedItems.includes(idx) ? <IconPlus /> : <IconMinus />}
            </ListButton>

            <ListButton type="button" danger onClick={() => this.handleRemoveItem(idx)}>
              <IconDelete />
            </ListButton>
          </div>
        </ListItemToolbar>

        <ListItemWrapper minimized={this.state.minimizedItems.includes(idx)}>
          {this.props.listItem(
            item,
            (field, value) => this.onChangeField(idx, field, value))}
        </ListItemWrapper>
      </ListItem>);
  }

  render() {
    return (
      <div className="list">
        <SortableList
          tag="div"
          options={{ handle: '.move', animation: 150 }}
          onChange={newOrder => this.handleReorder(newOrder)}
        >
          {this.renderItems()}
        </SortableList>

        <Button type="button" sm success onClick={() => this.handleAddItem()}>Add Item</Button>
      </div>
    );
  }
}

List.defaultProps = {
  titleField: '',
};

List.propTypes = {
  items: PropTypes.array.isRequired,
  onChangeList: PropTypes.func.isRequired,
  listItem: PropTypes.func.isRequired,
  titleField: PropTypes.string,
};

export default List;
