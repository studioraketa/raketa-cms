import React from 'react'
import AdminBuilder from '../components/AdminBuilder'
import { loadPage, savePage } from '../lib/storage'

const AdminPage = () => {
  return (
    <AdminBuilder
      page={loadPage()}
      host='http://localhost:5000'
      backUrl='http://localhost:5000'
      onSave={(page) => savePage(page)}
    />
  )
}

export default AdminPage
