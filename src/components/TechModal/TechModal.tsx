import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid black',
  },
};

interface TechModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const TechModal = ({ isOpen, closeModal }: TechModalProps) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      modal is open
    </Modal>
  );
};

export default observer(TechModal);
