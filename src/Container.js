import React from 'react';
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

export default Container;
