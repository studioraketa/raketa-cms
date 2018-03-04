import React from 'react';

const youtubeParser = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : false;
};

const vimeoParser = (url) => {
  const regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
  const match = url.match(regExp);

  return (match && match[2].length > 0) ? match[2] : false;
};

const videoParser = (videoUrl) => {
  if (videoUrl.indexOf('youtu') !== -1) {
    const videoId = youtubeParser(videoUrl);
    return { type: 'youtube', videoId };
  }

  if (videoUrl.indexOf('vimeo') !== -1) {
    const videoId = vimeoParser(videoUrl);
    return { type: 'vimeo', videoId };
  }

  return false;
};

const EmbeddedVideo = ({ videoUrl }) => {
  const video = videoParser(videoUrl);

  if (video.type === 'youtube') {
    return (
      <div className="video">
        <iframe frameBorder="0" allowFullScreen="0" src={`https://youtube.com/embed/${video.videoId}`} className="content" />
      </div>
    );
  }

  if (video.type === 'vimeo') {
    return (
      <div className="video">
        <iframe frameBorder="0" allowFullScreen="0" src={`https://player.vimeo.com/video/${video.videoId}?color=ffffff&title=0&byline=0&portrait=0`} className="content" />
      </div>
    );
  }

  return null;
};

export default EmbeddedVideo;
