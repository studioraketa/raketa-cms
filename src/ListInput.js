import React from 'react'
import { RaketaUIProvider } from 'raketa-ui'

import List from './List'

const ListInput = (props) => (
  <RaketaUIProvider>
    <List {...props} />
  </RaketaUIProvider>
)

export default ListInput
