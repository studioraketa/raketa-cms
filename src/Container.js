import React from 'react';
import PropTypes from 'prop-types';
import containerClass from './helpers/containerClass';

const Container = ({ settings, className, children }) => {
  const props = {};
  props.className = containerClass(className, settings);
  if (settings && settings.sectionID) props.id = settings.sectionID;

  return (
    <div {...props}>
      {children}
    </div>
  );
};

Container.defaultProps = {
  className: '',
  id: '',
};

Container.propTypes = {
  settings: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default Container;
