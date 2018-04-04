import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SortableList from 'react-sortablejs';
import { em, Title } from 'raketa-ui';
import Dialog from './Dialog';

const Handle = (props) => <img {...props} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItbW9yZS12ZXJ0aWNhbCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTIiIGN5PSI1IiByPSIxIj48L2NpcmNsZT48Y2lyY2xlIGN4PSIxMiIgY3k9IjE5IiByPSIxIj48L2NpcmNsZT48L3N2Zz4=" />;

const ReorderDialogItem = styled.div `
  display: flex;
  align-items: center;
  padding: ${em(0.5)};
  margin-bottom: ${em(0.5)};
  border: 1px solid ${props => props.theme.buttonColor};
  border-radius: 3px;
  color: ${props => props.theme.sideNavColor};
  cursor: move;

  h6 {
    margin-bottom: 0;
    margin-left: ${em(0.5)}
  }
`;

const handleStyles = {
  display: 'inline-block',
  width: '16px',
  marginRight: '.5em'
};

const titleStyles = {
  fontSize: '1em',
  fontWeight: 500
};

const sortableOptions = {
  handle: '.btn-drag',
  animation: 150
};

const ReorderWidgetsDialog = ({
  open,
  library,
  onClose,
  onChange,
  widgets,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    title="Reorder"
    primaryLabel=""
    secondaryLabel="Close"
  >
    <p>Drag and drop elements below to reorder the page layout.</p>

    <SortableList
      tag="div"
      options={sortableOptions}
      onChange={onChange}
    >
      {widgets.map((widget, idx) =>
        <div key={widget.widgetId} data-id={idx}>
          <ReorderDialogItem className="btn-drag">
            <Handle style={handleStyles} />
            <Title third style={titleStyles}>{library[widget.component].title}</Title>
          </ReorderDialogItem>
        </div>)}
    </SortableList>
  </Dialog>
);

ReorderWidgetsDialog.defaultProps = {
  widgets: [],
};

ReorderWidgetsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  widgets: PropTypes.array,
};

export default ReorderWidgetsDialog;
