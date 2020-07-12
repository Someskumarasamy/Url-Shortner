
import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import FeedBackForm from '../forms/FeedBackForm'
class FeedbackDialog extends React.Component {
  
  render() {
    const { isOpen,close } = this.props;
    return (
      <div>
        <Modal isOpen={isOpen}>
        <ModalHeader toggle={close}>Feedback</ModalHeader>
          <ModalBody>
              <FeedBackForm close={close}/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default FeedbackDialog;