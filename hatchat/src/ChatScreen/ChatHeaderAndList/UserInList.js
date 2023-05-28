function UserInList({ contact, handleContactSwitch }) {
    const handleClick = () => {
        handleContactSwitch(contact.id);
    };

    const truncatedName = contact.name.length > 12 ? contact.name.substring(0, 12) + "..." : contact.name;

    return (
        <li className="contactChat list-group-item list-group-item-action" onClick={handleClick}>
            <div className="user-img">
                <img className="dp" src={contact.profilePic} alt="" />
            </div>
            <div className="userName">{truncatedName}</div>
            <div className="timeAndHour">{contact.lastSeen}</div>
            <div className="lastMsg">{contact.bio}</div>
        </li>
    );
}

export default UserInList;
