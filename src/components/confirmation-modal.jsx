import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import styles from './confirmation-modal.scss';

function ConfirmationModal({
	children,
	show,
	title,
	onClose,
	onConfirm,
}) {
	return (
		<Modal backdrop="static" show={show} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body className={styles.body}>{children}</Modal.Body>
			<Modal.Footer>
				<Button variant="warning" onClick={onClose}>Cancel</Button>
				<Button variant="success" onClick={onConfirm}>Confirm</Button>
			</Modal.Footer>
		</Modal>
	);
}

ConfirmationModal.propTypes = {
	children: PropTypes.node.isRequired,
	show: PropTypes.bool.isRequired,
	title: PropTypes.string,
	onClose: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
};

ConfirmationModal.defaultProps = { title: 'Confirm' };

export default ConfirmationModal;
