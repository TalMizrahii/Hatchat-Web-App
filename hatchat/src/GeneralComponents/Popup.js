import React, { useState } from 'react';
import PasswordRequirement from "../RegistrationScreen/PasswordRequirement";
import "./Popup.css";

const Popup = ({ trigger, password }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div id="popup">
            <PasswordRequirement password={password} />
        </div>
    );
};

export default Popup;
