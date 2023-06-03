import React from "react";

function AddContactBtn({handleAddContact}){
    return (
        <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddContact}
            data-bs-dismiss="modal"
        >
            Add contact
        </button>
    );
}

export default AddContactBtn;