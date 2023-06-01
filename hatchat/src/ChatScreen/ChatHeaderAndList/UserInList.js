import React, { useState, useEffect, useRef } from 'react';

function UserInList({ contact, handleContactSwitch }) {
    const [showButton, setShowButton] = useState(false);
    const listItemRef = useRef(null);

    const handleClick = () => {
        handleContactSwitch(contact.id);
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
        setShowButton(true);
    };

    const handleButtonClick = (e) => {
        e.stopPropagation();
        console.log('Button clicked!');
    };

    useEffect(() => {
        const handleDocumentClick = (e) => {
            if (listItemRef.current && !listItemRef.current.contains(e.target)) {
                setShowButton(false);
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const truncatedName =
        contact.name.length > 12 ? contact.name.substring(0, 12) + '...' : contact.name;

    return (
        <li
            className="contactChat list-group-item list-group-item-action"
            onClick={handleClick}
            onContextMenu={handleContextMenu}
            ref={listItemRef}
        >
            <div className="user-img">
                <img className="dp" src={contact.profilePic} alt="avatar 1" />
            </div>
            <div className="userName">{truncatedName}</div>
            <div className="timeAndHour">{contact.lastSeen}</div>
            <div className="lastMsg">{contact.bio}</div>

            {showButton && (
                <button type="button" className="deleteChat btn btn-outline-danger right-click-button" onClick={handleButtonClick}>
                    Delete Chat
                </button>
            )}
        </li>
    );
}

export default UserInList;
