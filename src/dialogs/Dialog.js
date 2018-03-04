import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'raketa-ui';

const Modal = ({ open, onClose, title, children, primaryLabel, secondaryLabel = 'Cancel', onPrimary, width, dialogSize }) => (
  <Dialog
    open={open}
    title={title}
    primaryLabel={primaryLabel}
    secondaryLabel={secondaryLabel}
    width={width}
    onClose={onClose}
    onPrimary={onPrimary}
    onSecondary={onClose}
    dialogSize={dialogSize}
  >
    {children}
  </Dialog>
);

Modal.defaultProps = {
  children: [],
  dialogSize: '',
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.element.isRequired,
  ]),
  primaryLabel: PropTypes.string.isRequired,
  onPrimary: PropTypes.func,
  dialogSize: PropTypes.string,
};

export default Modal;
