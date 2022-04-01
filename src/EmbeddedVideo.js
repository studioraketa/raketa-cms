import React from 'react'

const VimeoEmbed = ({ videoId, autoplay }) => (
  <iframe
    frameBorder='0'
    allowFullScreen='0'
    src={`https://player.vimeo.com/video/${videoId}?color=ffffff&title=0&byline=0&portrait=0&autoplay=${
      autoplay === true ? '1' : '0'
    }`}
    className='content'
    allow='autoplay'
  />
)

const YoukuEmbed = ({ videoId, autoplay }) => (
  <iframe
    height='0'
    width='0'
    src={`https://player.youku.com/embed/${videoId}?autoplay=${
      autoplay === true ? '1' : '0'
    }`}
    frameBorder='0'
    allowFullScreen
    className='content'
    allow='autoplay'
  />
)

const YouTubeEmbed = ({ videoId, autoplay }) => (
  <iframe
    frameBorder='0'
    allowFullScreen
    src={`https://youtube.com/embed/${videoId}?autoplay=${
      autoplay === true ? '1' : '0'
    }`}
    className='content'
    allow='autoplay'
  />
)

const WistiaEmbed = ({ videoId }) => (
  <iframe
    frameBorder='0'
    allowFullScreen
    src={`https://fast.wistia.net/embed/iframe/${videoId}`}
    className='content'
    allow='autoplay'
  />
)

const videoType = (url) => {
  if (url.includes('youtu')) return 'youtube'
  if (url.includes('vimeo')) return 'vimeo'
  if (url.includes('youku')) return 'youku'
  if (url.includes('wistia')) return 'wistia'
}

const youtubeId = (url) => {
  const matches = url.match(
    /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/
  )
  return matches !== '' && matches !== null ? matches[5] : ''
}

const vimeoId = (url) => {
  const matches = url.match(/http(s?):\/\/(www\.)?vimeo\.com\/(\d+)($|\/)/)
  return matches !== '' && matches !== null ? matches[3] : ''
}

const youkuId = (url) => {
  const matches = url.match(
    /http(s?):\/\/v\.youku\.com\/v_show\/id_([A-Za-z0-9=]+)\.html/
  )
  return matches !== '' && matches !== null ? matches[2] : ''
}

const wistiaId = (url) => {
  const matches = url.match(
    /http(s?):\/\/fast\.wistia\.net\/embed\/iframe\/(.*)($|\?)/
  )
  return matches !== '' && matches !== null ? matches[2] : ''
}

const videoId = (url) => {
  if (videoType(url) === 'youtube') return youtubeId(url)
  if (videoType(url) === 'vimeo') return vimeoId(url)
  if (videoType(url) === 'youku') return youkuId(url)
  if (videoType(url) === 'wistia') return wistiaId(url)
}

const VideoComponentType = {
  youtube: YouTubeEmbed,
  vimeo: VimeoEmbed,
  youku: YoukuEmbed,
  wistia: WistiaEmbed
}

const EmbeddedVideo = ({ videoUrl, autoplay = false }) => {
  const vType = videoType(videoUrl)
  const vId = videoId(videoUrl)
  const VideoComponent = VideoComponentType[vType]

  if (VideoComponent) {
    return <VideoComponent videoId={vId} autoplay={autoplay} />
  }

  return null
}

export default EmbeddedVideo
