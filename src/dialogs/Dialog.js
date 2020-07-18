import React from 'react'
import styled from 'styled-components'
import { Modal as UIModal, Button } from '@raketa-cms/raketa-mir'

const ModalFooter = styled.div``

const Modal = ({
  open,
  onClose,
  title,
  children,
  primaryLabel,
  secondaryLabel = 'Cancel',
  onPrimary,
  onSecondary,
  width,
  dialogSize
}) => (
  <UIModal open={open} title={title} onClose={onClose}>
    {children}

    {(primaryLabel || secondaryLabel) && (
      <ModalFooter>
        {primaryLabel && (
          <Button type='button' variant='primary' onClick={onPrimary}>
            {primaryLabel}
          </Button>
        )}

        {secondaryLabel && (
          <Button type='button' variant='secondary' onClick={onSecondary}>
            {secondaryLabel}
          </Button>
        )}
      </ModalFooter>
    )}
  </UIModal>
)

Modal.defaultProps = {
  children: [],
  dialogSize: ''
}

export default Modal
