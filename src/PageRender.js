import React from 'react';
import PropTypes from 'prop-types';

const PageRender = ({ library, page }) => (
  <div>
    {page.widgets.map((widget, idx) =>
      React.createElement(
        library[widget.component],
        Object.assign({}, { key: idx }, widget.settings)))}
  </div>
);

PageRender.propTypes = {
  library: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired,
};

export default PageRender;
