import React from 'react';
import PropTypes from 'prop-types';
import MdReorder from 'react-icons/lib/md/reorder';
import styled from 'styled-components';
import SortableList from 'react-sortablejs';
import { em } from 'raketa-ui';
import Dialog from './Dialog';

const ReorderDialogItem = styled.div `
  display: flex;
  align-items: center;
  padding: ${em(0.5)};
  margin-bottom: ${em(0.5)};
  border: 1px solid ${props => props.theme.buttonColor};
  color: ${props => props.theme.sideNavColor};
  cursor: move;

  h6 {
    margin-bottom: 0;
    margin-left: ${em(0.5)}
  }
`;

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
    title="Reorder Content"
    primaryLabel=""
    secondaryLabel="Close"
  >
    <p>Drag and drop elements to reorder content.</p>

    <SortableList
      tag="div"
      options={{ handle: '.btn-drag', animation: 150 }}
      onChange={onChange}
    >
      {widgets.map((widget, idx) =>
        <div key={widget.widgetId} data-id={idx}>
          <ReorderDialogItem className="btn-drag">
            <MdReorder />
            <h6>{library[widget.component].title}</h6>
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
