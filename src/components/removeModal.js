import React from 'react';
import Modal from 'react-modal';

const RemoveModal = (props) => (
    
    <Modal
        isOpen={props.isopen}
        contentLabel="Remove Expense"
        onRequestClose={props.isclose}
        closeTimeoutMS={200}
        className="modal"
        ariaHideApp={false}
    >

    <p>Are you sure you want to remove this Blog?</p>
    <div>
        <button onClick={props.confirmRemove}>Confirm</button>
        <button onClick={props.isclose}>Cancel</button>
    </div>
    </Modal>

)

export default RemoveModal;