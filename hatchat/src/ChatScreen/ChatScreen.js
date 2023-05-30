import './ChatScreen.css';
import '../LoginScreen/LoginScreen.css';
import GeneralBackground from "../GeneralComponents/GeneralBackground";
import GeneralContainer from "./GeneralContainer";
import ChatSpace from "./ChatHeaderAndList/ChatSpace";
import ConversationSpace from "./ChatConversation/ConversationSpace";
import {useEffect, useState} from "react";
import ContactMsg from "../DataBase/contactMsg";
import {useNavigate} from "react-router-dom";
import ContactsData from "../DataBase/ContactsData";


const exitToLogin = (navigate) => {
    return navigate('/')
};

function ChatScreen({currentUsernameAndToken}) {
    const [searchContent, setSearchContent] = useState("");
    const [activeUser, setActiveUser] = useState({});
    const [filteredContacts, setFilteredContacts] = useState(ContactsData);
    const [currentFeed, setCurrentFeed] = useState([]);
    const [currentContactId, setCurrentContactId] = useState(-1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getCurrentUser();
                await handleChatsFromServer();
            } catch (error) {
                // Handle the error here
                console.error("Error fetching user:", error);
                // Display an error message.
                alert("Error fetching user");
                navigate('/');
            }
        };
        fetchData(); // Call the fetchData function
        // Add missing dependencies to the dependency array
    }, [navigate, currentUsernameAndToken]);

    const getCurrentUser = async () => {
        // Create the path to the user in the server.
        const getUserPath = 'http://localhost:5000/api/Users/' + currentUsernameAndToken.username;
        const res = await fetch(getUserPath, {
            'method': 'get',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': currentUsernameAndToken.token,
                'username': currentUsernameAndToken.username,
            },
        });
        if (!res.ok) {
            navigate('/');
            // Display an error message.
            alert("Invalid username or password");
        } else {
            const currentActiveUser = await res.json();
            setActiveUser(currentActiveUser);
        }
    };

    const handleLogout = () => {
        setSearchContent("");
        setFilteredContacts(null);
        setCurrentFeed([]);
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
        const existingContact = ContactsData.find((c) => c.id === contact.id);
        if (!existingContact) {
            ContactsData.push(contact);
            setFilteredContacts([...ContactsData]);
        }
        setCurrentContactId(contact.id);
    };


    const handleChatsFromServer = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/Chats', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': currentUsernameAndToken.token,
                },
            });
            if (!res.ok) {
                navigate('/');
                // Display an error message.
                alert('Chat loading failed');
            } else {
                const allChats = await res.json();
                allChats.forEach((chat) => {
                    const contact = {
                        id: chat.id,
                        name: chat.user.displayName,
                        profilePic: chat.user.profilePic,
                    };
                    addContact(contact);
                });
            }
        } catch (error) {
            // Handle the error here
            console.error('Error fetching chats:', error);
            // Display an error message.
            alert('Error fetching chats');
            navigate('/');
        }
    };


    const handleMessageToServer = async (content) => {
        const data = {"msg": content.text};
        const pathToMessageUser = 'http://localhost:5000/api/Chats/' + currentContact.id + '/Messages'
        const res = await fetch(pathToMessageUser, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': currentUsernameAndToken.token,
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            const response1 = await res.json();
            const response2 = await handleMessagePresentation();

        } else {
            return null;
        }
    }


    const handleMessagePresentation = async () => {
        const res = await fetch('http://localhost:5000/api/Chats/' + currentContactId, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': currentUsernameAndToken.token,
            },
        });
        if (res.ok) {
            const response = await res.json();
            setCurrentFeed(response.messages);
        } else {
            // Display an error message.
            alert('Chat loading failed');
        }
    };

    const handleNewMessage = (content) => {
        const response = handleMessageToServer(content);
    };
    const handleContactSwitch = (content) => {
        setCurrentContactId(content);
        const response2 = handleMessagePresentation();
    }
    let currentContact = ContactsData.find((contact) => contact.id === currentContactId);

    return (
        <>
            <GeneralBackground/>
            <GeneralContainer>
                {/*Contains all components about the list of contacts and the search and menu functionality.*/}
                <ChatSpace currentUsernameAndToken={currentUsernameAndToken}
                           handleLogout={handleLogout}
                           activeUser={activeUser}
                           handleContactSwitch={handleContactSwitch}
                           handleSearch={handleSearch}
                           addContact={addContact}
                           filteredContacts={filteredContacts}/>
                {/*Contains all components about the conversation with the contacts*/}
                <ConversationSpace currentFeed={currentFeed}
                                   activeUser={activeUser}
                                   currentContact={currentContact}
                                   currentContactId={currentContactId}
                                   handleNewMessage={handleNewMessage}/>
            </GeneralContainer>
        </>
    );
}

export default ChatScreen;