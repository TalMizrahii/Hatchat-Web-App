import XCloseModal from "./XCloseModal";
import React from "react";

function ModalTitle(){
    return (
        <div className="modal-header">
            <h1
                className="modal-title-background modal-title fs-5"
                id="exampleModalLabel"
            >
                Add new contact
            </h1>
            <XCloseModal/>
        </div>
    );
}

export default ModalTitle;