import React from 'react';

const Img = ({ src, variant, className, onLoad }) => {
  if (typeof src === 'object' && (src.name.includes('.svg') || src.name.includes('.gif'))) return (<img src={src.urls.original} alt={src.alt} className={className} onLoad={onLoad} />);
  if (typeof src === 'string') return (<img src={src} alt={src} className={className} onLoad={onLoad} />);
  if (typeof src === 'object') return (<img src={src.urls[variant]} alt={src.alt} className={className} onLoad={onLoad} />);

  return null;
};

export default Img;
