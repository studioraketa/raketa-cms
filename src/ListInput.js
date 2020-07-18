import React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from '@raketa-cms/raketa-mir'

import List from './List'

const ListInput = (props) => (
  <ThemeProvider theme={theme}>
    <List {...props} />
  </ThemeProvider>
)

export default ListInput
