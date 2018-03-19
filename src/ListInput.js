import React from 'react';
import PropTypes from 'prop-types';
import { RaketaUIProvider } from 'raketa-ui';

import List from './List';

class ListInput extends React.Component {
  render() {
    const { name, listItem, onChangeList, items } = this.props;

    return (
      <RaketaUIProvider>
        <List
          listItem={listItem}
          onChangeList={onChangeList}
          items={items}
        />
      </RaketaUIProvider>
    );
  }
}

ListInput.propTypes = {
  // image: PropTypes.object.isRequired,
  // name: PropTypes.name.isRequired,
};

export default ListInput;
