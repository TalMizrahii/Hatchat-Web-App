import AddContactIcon from "./AddContactIcon";
import ModalAddContactWrap from "./ModalRelated/ModalAddContactWrap";
import ModalAddContact from "./ModalRelated/ModalAddContact";
import ManuWrapper from "./ManuWraper";
import React from "react";

function NavIcons({currentUsernameAndToken, handleLogout, addContact, filteredContacts, handleContactSwitch}) {
    return (
        <div className="nav-icons">
            <AddContactIcon/>
            <ModalAddContactWrap>
                <ModalAddContact handleContactSwitch={handleContactSwitch} currentUsernameAndToken={currentUsernameAndToken} filteredContacts={filteredContacts} addContact={addContact}/>
            </ModalAddContactWrap>
            <ManuWrapper handleLogout={handleLogout}/>
        </div>
    );
}

export default NavIcons;