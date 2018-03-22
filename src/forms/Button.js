import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ settings, className }) => {
  const { button_id, button_label, button_link, button_target, button_type, follow_link } = settings;

  let buttonClass;

  if (button_type === 'accented') buttonClass = 'btn-active-dark';
  if (button_type === 'regular') buttonClass = 'btn-passive-light';
  if (button_type === 'link') buttonClass = 'btn-text';
  if (className) buttonClass = `${buttonClass} ${className}`;

  return (
    <a
      href={button_link}
      className={buttonClass}
      id={button_id}
      target={button_target}
      rel={follow_link === 'no-follow' ? 'nofollow' : ''}
    >{button_label}</a>);
};

Button.propTypes = {
  settings: PropTypes.object.isRequired,
};

export default Button;
