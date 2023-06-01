import UserInList from "./UserInList";

function ListGroupOfContacts({handleChatDelete, filteredContacts, handleContactSwitch}) {
    const filterList = filteredContacts.map((contact, key) =>{
        return <UserInList handleChatDelete={handleChatDelete} handleContactSwitch={handleContactSwitch} key={key} contact={contact} />;
    });

    return (
        <div id="listScroll">
            <ul className="list-group">
                {filterList}
            </ul>
        </div>
    );
}


export default ListGroupOfContacts;