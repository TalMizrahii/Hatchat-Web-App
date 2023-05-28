import './ChatScreen.css';
import '../LoginScreen/LoginScreen.css';
import GeneralBackground from "../GeneralComponents/GeneralBackground";
import GeneralContainer from "./GeneralContainer";
import ChatSpace from "./ChatHeaderAndList/ChatSpace";
import ConversationSpace from "./ChatConversation/ConversationSpace";
import {useState} from "react";
import ContactMsg from "../DataBase/contactMsg";
import {useLocation} from "react-router";
import {useNavigate} from "react-router-dom";
import ContactsData from "../DataBase/ContactsData";


const exitToLogin = (navigate) => {
    return navigate('/')
};

function ChatScreen() {
    const {state} = useLocation();
    const {fullName = '', userName = '', userPassword = '', profilePicture = ''} = state || {};
    console.log(fullName, userName, userPassword, profilePicture);

    const [searchContent, setSearchContent] = useState("");
    const [filteredContacts, setFilteredContacts] = useState(ContactsData);
    const [contactsMsg, setContactMsg] = useState(ContactMsg);
    const [currentContactId, setCurrentContactId] = useState(-1);

    let userProfilePicture = 'https://images.squarespace-cdn.com/content/v1/5c76de607fdcb8facd765433/1592926322727-OL8OFAUGXH0Q5XMF6AXC/IMG-4874.JPG';
    if (profilePicture) {
        userProfilePicture = URL.createObjectURL(profilePicture);
    }

    const navigate = useNavigate();

    const handleLogout = () => {
        setSearchContent("");
        setFilteredContacts(null);
        setContactMsg([]);
        setCurrentContactId(-1);
        ContactsData.length = 0;
        exitToLogin(navigate);
    }

    const handleSearch = (content) => {
        setSearchContent(content);
        if (content === "") {
            setFilteredContacts(ContactsData);
        } else {
            const filtered = ContactsData.filter((contact) =>
                contact.name.includes(content)
            );
            setFilteredContacts(filtered);
        }
    };

    const addContact = (contact) => {
        ContactsData.push(contact);
        setFilteredContacts([...ContactsData]);
        setCurrentContactId(contact.id);
    };

    const handleNewMessage = (content) => {
        const newMessage = {
            text: content.text,
            timeAndDate: content.timeAndDate,
        };

        setContactMsg((prevContactMsg) => {
            const updatedContactMsg = { ...prevContactMsg };
            updatedContactMsg[currentContactId] = [
                ...(updatedContactMsg[currentContactId] || []),
                newMessage,
            ];

            // Update the bio and lastSeen of the current contact
            setFilteredContacts((prevFilteredContacts) => {
                const updatedContacts = [...prevFilteredContacts];
                const contactIndex = updatedContacts.findIndex(
                    (contact) => contact.id === currentContactId
                );
                if (contactIndex !== -1) {
                    updatedContacts[contactIndex] = {
                        ...updatedContacts[contactIndex],
                        bio: newMessage.text.slice(0, 22),
                        lastSeen: newMessage.timeAndDate,
                    };
                    updatedContacts.unshift(updatedContacts.splice(contactIndex, 1)[0]);
                }
                return updatedContacts;
            });

            return updatedContactMsg;
        });
    };


    const handleContactSwitch = (content) => {
        setCurrentContactId(content);
    }

    let currentContact = ContactsData.find((contact) => contact.id === currentContactId);


    return (
        <>
            <GeneralBackground/>
            <GeneralContainer>
                {/*Contains all components about the list of contacts and the search and menu functionality.*/}
                <ChatSpace handleLogout={handleLogout} profilePicture={userProfilePicture}
                           handleContactSwitch={handleContactSwitch}
                           handleSearch={handleSearch} addContact={addContact}
                           filteredContacts={filteredContacts}/>
                {/*Contains all components about the conversation with the contacts*/}
                <ConversationSpace profilePicture={userProfilePicture} currentContact={currentContact}
                                   currentContactId={currentContactId}
                                   contactsMsg={contactsMsg} handleNewMessage={handleNewMessage}/>
            </GeneralContainer>
        </>
    );
}

export default ChatScreen;