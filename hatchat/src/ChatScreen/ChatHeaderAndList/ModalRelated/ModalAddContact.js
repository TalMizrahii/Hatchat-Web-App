import React, {useState} from "react";
import ModalInputIdOrName from "./ModalInputIdOrName";
import AddContactBtn from "./AddContactBtn";
import CloseModalBtn from "./CloseModalBtn";
import ModalTitle from "./ModalTitle";

function ModalAddContact({activeUser, handleContactSwitch, currentUsernameAndToken, addContact, filteredContacts}) {

    const [contactData, setContactData] = useState({
        id: null,
        name: "",
        bio: "",
        profilePic: "",
        lastSeen: new Date().toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        }),
    });


    const validateIsInList = (username) => {
        // Check if contact ID already exists
        const existingContact = filteredContacts.find(
            (contact) => contact.name === username
        );
        if (existingContact) {
            alert("contact already exist");
            return 0;
        }
        return 1;
    }

    const handleAddChatToServer = async () => {
        const data = {
            "username": contactData.name
        };
        if(contactData.name === activeUser.username){
            alert("You can't add yourself");
            return;
        }
        if (!validateIsInList(contactData.name)) {
            return;
        }

        const res = await fetch('http://localhost:5000/api/Chats', {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': currentUsernameAndToken.token,
            },
            'body': JSON.stringify(data)
        });
        let response;
        try {
            response = await res.json();
        } catch (error) {
            alert("No such user");
            return;
        }
        if (res.ok) {
            const newContact = {
                id: response.id,
                name: response.user.username,
                bio: "",
                profilePic: response.user.profilePic,
                lastSeen: new Date().toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                })
            }
            addContact(newContact);
            handleContactSwitch(newContact.id)
        } else {
            alert("No such user");
        }
    }

    const handleChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        setContactData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddContact = () => {
        const res = handleAddChatToServer();
    };

    return (
        <>
            <ModalTitle/>
            <div className="modal-body">
                <ModalInputIdOrName
                    label="Contact's name"
                    placeholder="Contact's name"
                    name="name"
                    value={contactData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="modal-footer">
                <CloseModalBtn/>
                <AddContactBtn handleAddContact={handleAddContact}/>
            </div>
        </>
    );
}

export default ModalAddContact;
