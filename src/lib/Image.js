import React from 'react';
import PropTypes from 'prop-types';

const Img = ({ src, variant, className }) => {
  if (typeof src === 'object' && (src.name.includes('.svg') || src.name.includes('.gif'))) return (<img src={src.urls.original} className={className} alt={src.alt} />);
  if (typeof src === 'string') return (<img src={src} className={className} alt={src} />);
  if (typeof src === 'object') return (<img src={src.urls[variant]} className={className} alt={src.alt} />);

  return null;
};

Img.propTypes = {
  src: PropTypes.any,
  variant: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Img;
