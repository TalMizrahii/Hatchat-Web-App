import React, {useState, useEffect, useRef} from 'react';

function UserInList({handleChatDelete, contact, handleContactSwitch}) {
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
        handleChatDelete(contact.id);
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

    const truncatedName = contact.name.length > 10 ? contact.name.substring(0, 10) + '...' : contact.name;

    let truncatedBio = "";
    if (contact.bio !== null && contact.bio !== undefined && contact.bio !== "") {
        truncatedBio = contact.bio.length > 8 ? contact.bio.substring(0, 8) + '...' : contact.bio;
    }


    return (
        <li
            className="contactChat list-group-item list-group-item-action"
            onClick={handleClick}
            onContextMenu={handleContextMenu}
            ref={listItemRef}
        >
            <div className="user-img">
                <img className="dp" src={contact.profilePic} alt="avatar 1"/>
            </div>
            {showButton && (
                <button type="button" className="deleteChat btn btn-outline-danger right-click-button"
                        onClick={handleButtonClick}>
                    Delete Chat
                </button>
            )}
            <div className="userName">{truncatedName}</div>
            <div className="timeAndHour">{contact.lastSeen}</div>
            <div className="lastMsg">{truncatedBio}</div>
        </li>
    );
}

export default UserInList;
