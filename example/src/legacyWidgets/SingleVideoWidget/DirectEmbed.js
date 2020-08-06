import React from 'react';
import { EmbeddedVideo, Img } from '@raketa-cms/raketa-cms'

class DirectEmbed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
    };
  }

  handlePlay = () => this.setState({ play: true })

  render() {
    const { play } = this.state;
    const { image, videoUrl } = this.props;

    return (
      <div onClick={this.handlePlay} ref={videoWrapper => this.videoWrapper = videoWrapper}>
        {play || !image ?
          <div className="full-image full-video" style={{ display: 'block' }}>
            <EmbeddedVideo videoUrl={videoUrl} autoplay={play} />
          </div>
          :
          <div className="full-image-anchor" style={{ cursor: 'pointer' }}>
            <span className="icon-play-round"></span>

            <div className="full-image full-video">
              <Img loading="lazy" src={image} variant="thumb" className="content" />
            </div>
          </div>
        }
      </div>
    );
  }
}

export default DirectEmbed;
