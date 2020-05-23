import React from 'react'
import { PageBuilder, MediaManager } from '@raketa-cms/raketa-cms'
import LIBRARY from './widgets'

class AdminBuilder extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dirty: false,
      isLoading: false,
      page: props.page
    }

    this.mediaManager = new MediaManager('/images/client/')
  }

  componentDidCatch(error, info) {
    console.log('error', error, info)
  }

  handleChange() {
    this.setState({ dirty: true })
  }

  handleSave(page) {
    // const { save_url } = this.props;

    this.setState({ isLoading: true, dirty: false })
  }

  render() {
    const { host, back_url } = this.props
    const { dirty, page } = this.state

    return (
      <div className='widgets-spacings-reset'>
        <PageBuilder
          host={host}
          dirty={dirty}
          library={LIBRARY}
          themes={[
            ['none', 'None'],
            ['light', 'Light'],
            ['dark', 'Dark'],
            ['brand', 'Brand']
          ]}
          page={page}
          mediaManager={this.mediaManager}
          onChange={(changedPage) => this.handleChange(changedPage)}
          onSave={(pageToSave) => this.handleSave(pageToSave)}
          onExit={() => (window.location.href = back_url)}
        />
      </div>
    )
  }
}

AdminBuilder.defaultProps = {
  host: 'http://localhost:3000/'
}

export default AdminBuilder
