import React from 'react';
import PropTypes from 'prop-types';

const Img = ({ src, variant, ...rest }) => {
  if (typeof src === 'object' && (src.name.includes('.svg') || src.name.includes('.gif'))) return (<img src={src.urls.original} alt={src.alt} {...rest} />);
  if (typeof src === 'string') return (<img src={src} alt={src} {...rest} />);
  if (typeof src === 'object') return (<img src={src.urls[variant]} alt={src.alt} {...rest} />);

  return null;
};

Img.propTypes = {
  src: PropTypes.any,
  variant: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Img;
