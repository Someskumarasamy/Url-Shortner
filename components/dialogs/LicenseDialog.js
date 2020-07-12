
import React from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import LicenseModal from '../modals/licenseModal';
class LicenseDialog extends React.Component {
    constructor() {
        super();

    }

    render() {
        const { isOpen, close } = this.props;
        return (
            <div>
                <Modal isOpen={isOpen} keyboard={true} toggle={close}>
                    <ModalBody onKeyPress={close}>
                        <LicenseModal></LicenseModal>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default LicenseDialog;