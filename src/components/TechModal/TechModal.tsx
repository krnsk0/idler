import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import Modal from 'react-modal';
import { useStore } from '../../store/Provider';

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

const TechModal = () => {
  const root = useStore();
  return (
    <Modal
      isOpen={root.gui.techModal}
      onRequestClose={() => root.gui.closeTechModal()}
      style={customStyles}
    >
      modal is open
    </Modal>
  );
};

export default observer(TechModal);
