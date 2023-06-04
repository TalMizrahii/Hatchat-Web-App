import './ChatScreen.css';
import '../LoginScreen/LoginScreen.css';
import GeneralBackground from "../GeneralComponents/GeneralBackground";
import GeneralContainer from "./GeneralContainer";
import ChatSpace from "./ChatHeaderAndList/ChatSpace";
import ConversationSpace from "./ChatConversation/ConversationSpace";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


const exitToLogin = (navigate) => {
    return navigate('/')
};

function ChatScreen({currentUsernameAndToken}) {
    const [searchContent, setSearchContent] = useState("");
    const [activeUser, setActiveUser] = useState({});
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [currentFeed, setCurrentFeed] = useState([]);
    const [currentContactId, setCurrentContactId] = useState(-1);
    const navigate = useNavigate();

    let currentContact = filteredContacts.find((contact) => contact.id === currentContactId);


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
        const res = fetchData(); // Call the fetchData function
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
        filteredContacts.length = 0;
        exitToLogin(navigate);
    }

    const handleSearch = (content) => {
        setSearchContent(content);
        if (content === "") {
            setFilteredContacts(filteredContacts);
        } else {
            const filtered = filteredContacts.filter((contact) =>
                contact.name.includes(content)
            );
            setFilteredContacts(filtered);
        }
    };

    const addContact = (contact) => {
        const existingContact = filteredContacts.find((c) => c.id === contact.id);
        if (!existingContact) {
            filteredContacts.push(contact);
            setFilteredContacts([...filteredContacts]);
        }
        setCurrentContactId(contact.id);
    };


    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true
        });
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
            } else {
                const allChats = await res.json();
                let contact;
                allChats.sort((a, b) => {
                    // Compare the timestamps, handling empty or null values
                    const timestampA = a.lastMessage ? a.lastMessage.created : '';
                    const timestampB = b.lastMessage ? b.lastMessage.created : '';
                    if (timestampA < timestampB) {
                        return 1;
                    } else if (timestampA > timestampB) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                allChats.forEach((chat) => {
                    contact = {
                        id: chat.id,
                        name: chat.user.displayName,
                        profilePic: chat.user.profilePic,
                    };
                    if (chat.lastMessage) {
                        contact.bio = chat.lastMessage.content;
                        contact.lastSeen = formatTimestamp(chat.lastMessage.created);
                    }
                    addContact(contact);
                });
                await handleMessagePresentation(allChats[0].id);
            }
        } catch (error) {
            // Handle the error here
            console.error('Error fetching chats:', error);
        }
    };


    const handleMessageToServer = async (content) => {
        // Create a data json to send to the server.
        const data = {"msg": content.text};
        const idMsg = currentContact.id + '/Messages';
        const pathToMessageUser = 'http://localhost:5000/api/Chats/' + idMsg;
        const res = await fetch(pathToMessageUser, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': currentUsernameAndToken.token,
            },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            const response = await res.json();
            setCurrentFeed(prevFeed => [...prevFeed, response]);
        } else {
            return null;
        }
    }

    const handleMessagePresentation = async (contactId) => {
        const res = await fetch('http://localhost:5000/api/Chats/' + contactId, {
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
        }
    };

    const updateContactInList = (content) => {
        if (content.text === "") {
            return;
        }
        const newMessage = {
            text: content.text,
            timeAndDate: content.timeAndDate,
        };

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
    }

    const handleNewMessage = (content) => {
        const newMessage = {
            text: content.text,
            timeAndDate: content.timeAndDate,
        };

        const response = handleMessageToServer(content);
        // Update the bio and lastSeen of the current contact
        updateContactInList(content);
    };

    const handleContactSwitch = (contactId) => {
        setCurrentContactId(contactId);
        const response2 = handleMessagePresentation(contactId);
        currentContact = filteredContacts.find((contact) => contact.id === currentContactId);
    }

    const handleChatDeleteFromServer = async (chatId) => {
        const res = await fetch('http://localhost:5000/api/Chats/' + chatId, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': currentUsernameAndToken.token,
            },
        });
        if (res.ok) {
            console.log("deleted successfully");
        } else {
            // Display an error message.
            console.log("Error in deletion.");
        }
    }

    const handleChatDelete = async (chatId) => {
        await handleChatDeleteFromServer(chatId);
        setFilteredContacts((prevFilteredContacts) => {
            const updatedContacts = [...prevFilteredContacts];
            const contactIndex = updatedContacts.findIndex(
                (contact) => contact.id === chatId
            );
            if (contactIndex !== -1) {
                updatedContacts.splice(contactIndex, 1);
            }
            return updatedContacts;
        });
    }

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
                           filteredContacts={filteredContacts}
                           handleChatDelete={handleChatDelete}
                />
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