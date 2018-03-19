import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SortableList from 'react-sortablejs';

import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import MdImportExport from 'react-icons/lib/md/import-export';
import MdDelete from 'react-icons/lib/md/delete';

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
`;

const ListItemToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${em(.7)} ${em(1)};
  background-color: ${props => props.theme.buttonColor};
`;

const ListItemWrapper = styled.div`
  padding: ${em(1)};
  ${props => props.minimized ? 'display: none' : ''}
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
          <strong>{this.props.titleField !== '' ? item[this.props.titleField] : `Item ${idx + 1}`}</strong>

          <div>
            <IconButton type="button" onClick={() => this.handleToggle(idx)}><MdKeyboardArrowDown /></IconButton>
            <IconSpan className="move btn-drag"><MdImportExport /></IconSpan>
            <IconButton type="button" danger onClick={() => this.handleRemoveItem(idx)}><MdDelete /></IconButton>
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

        <Button type="button" success onClick={() => this.handleAddItem()}>Add Item</Button>
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
