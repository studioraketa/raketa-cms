import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ settings, children, className }) => {
  const { id, label, link, target, rel } = settings;

  return (
    <a
      href={link}
      className={[settings.className, className].join(' ')}
      id={id ? id : ''}
      target={target}
      rel={rel}
    >{children ? children : settings.label}</a>);
};

Link.propTypes = {
  settings: PropTypes.object.isRequired,
};

export default Link;
