import React from 'react'
import { RaketaUIProvider } from 'raketa-ui'

import List from './List'

class ListInput extends React.Component {
  render() {
    return (
      <RaketaUIProvider>
        <List {...this.props} />
      </RaketaUIProvider>
    )
  }
}

export default ListInput
