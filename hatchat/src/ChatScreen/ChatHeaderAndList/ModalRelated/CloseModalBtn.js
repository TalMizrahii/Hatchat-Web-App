import React from "react";

function CloseModalBtn() {
    return (
        <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
        >
            Close
        </button>
    );
}

export default CloseModalBtn;