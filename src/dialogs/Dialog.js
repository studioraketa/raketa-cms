import React from 'react'
import styled from 'styled-components'
import { Modal, Button } from '@raketa-cms/raketa-mir'

const ModalContent = styled.div`
  max-height: 75vh;
  overflow-y: auto;
`

const ModalFooter = styled.div`
  padding-top: ${(props) => props.theme.font.base};
  border-top: 2px solid ${(props) => props.theme.colors.lightGray};
`

const Dialog = ({
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
  <Modal open={open} title={title} onClose={onClose}>
    <ModalContent>{children}</ModalContent>

    {(primaryLabel || secondaryLabel) && (
      <ModalFooter>
        {primaryLabel && (
          <Button type='button' variant='primary' onClick={onPrimary}>
            {primaryLabel}
          </Button>
        )}

        {secondaryLabel && (
          <Button type='button' variant='secondary' onClick={onClose}>
            {secondaryLabel}
          </Button>
        )}
      </ModalFooter>
    )}
  </Modal>
)

Dialog.defaultProps = {
  children: [],
  dialogSize: ''
}

export default Dialog
