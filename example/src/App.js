import React from 'react'

import AdminBuilder from './AdminBuilder';

const PAGE = {
  title: 'Example',
  slug: 'example',
  widgets: [],
}

const App = () => {
  return <AdminBuilder page={PAGE} back_url="https://google.com/" />
}

export default App
