import {  ReactNode, useEffect, useState } from 'react';
import ReactModal from 'react-modal';

interface IModalProps{
  isOpen: boolean,
  setIsOpen: ()=>void
  children: ReactNode
}
function Modal(props: IModalProps){
  const [modalStatus, setModalStatus] = useState(props.isOpen)

  const { children, setIsOpen } = props;
  
  useEffect(()=>{
    const { isOpen } = props;

    if (modalStatus !== isOpen) {
      setModalStatus(isOpen)
    }
  }, [props.isOpen])
  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F0F0F5',
          color: '#000000',
          borderRadius: '8px',
          width: '90%',
          maxWidth: '736px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  );
}


export default Modal;
