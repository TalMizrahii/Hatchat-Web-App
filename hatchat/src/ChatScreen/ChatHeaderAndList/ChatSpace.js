import HeaderBox from "./HeaderBox";
import UserImageLeftTopCorner from "./UserImageLeftTopCorner";
import NavIcons from "./NavIcons";
import SearchInput from "./SearchInput";
import ListGroupOfContacts from "./ListGroupOfContacts.";

function ChatSpace({
                       handleChatDelete, currentUsernameAndToken,
                       handleLogout,
                       activeUser,
                       handleSearch,
                       addContact,
                       filteredContacts,
                       handleContactSwitch
                   }) {

    return (
        <>
            <div className="col-md-3 g-0 chatScreen">
                <HeaderBox>
                    <UserImageLeftTopCorner activeUser={activeUser}/>
                    <NavIcons handleContactSwitch={handleContactSwitch}
                              currentUsernameAndToken={currentUsernameAndToken}
                              handleLogout={handleLogout}
                              filteredContacts={filteredContacts}
                              addContact={addContact}
                              activeUser={activeUser}
                    />
                </HeaderBox>
                <SearchInput handleSearch={handleSearch}/>
                <ListGroupOfContacts handleChatDelete={handleChatDelete}
                                     handleContactSwitch={handleContactSwitch}
                                     filteredContacts={filteredContacts}/>
            </div>
        </>
    );
}

export default ChatSpace;
