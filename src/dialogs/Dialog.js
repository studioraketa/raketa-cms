import React from 'react'
import { Dialog } from 'raketa-ui'

const Modal = ({
  open,
  onClose,
  title,
  children,
  primaryLabel,
  secondaryLabel = 'Cancel',
  onPrimary,
  width,
  dialogSize
}) => (
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
)

Modal.defaultProps = {
  children: [],
  dialogSize: ''
}

export default Modal
