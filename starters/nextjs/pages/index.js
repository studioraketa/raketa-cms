import React from 'react'
import PageRender from '../components/PageRender'
import { loadPage } from '../lib/storage'

const HomePage = () => <PageRender page={loadPage()} />

export default HomePage
