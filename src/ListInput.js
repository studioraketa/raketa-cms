import React from 'react';
import { RaketaUIProvider } from 'raketa-ui';

import List from './List';

class ListInput extends React.Component {
  render() {
    const { listItem, onChangeList, items } = this.props;

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

export default ListInput;
