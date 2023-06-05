import React from "react";
import ChatSpaceHeader from "./ChatSpaceHeader";
import MsgWrapperScroll from "./MsgWrapperScroll";
import InputMsgLowerBar from "./inputMsgLowerBar";
import MsgScrollerGood from "./MsgScrollerGood";
import UserSelfMsg from "./UserSelfMsg";
import ContactResponseMsg from "./ContactResponseMsg";

function ConversationSpace({
                               filteredContacts,
                               currentFeed,
                               activeUser,
                               handleNewMessage,
                               currentContactId
                           }) {
    const handleFirstNextMessage = (content) => {
        if (currentContactId === -1) {
            return;
        }
        handleNewMessage(content);
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

    if (currentContactId === -1) {
        return (
            <div className="col-md-9 g-0 chatsList">
                <ChatSpaceHeader/>
                <MsgWrapperScroll>
                    <InputMsgLowerBar handleFirstNextMessage={handleFirstNextMessage}/>
                    <MsgScrollerGood>
                        <div> No messages to display</div>
                    </MsgScrollerGood>
                </MsgWrapperScroll>
            </div>
        );
    }

    return (
        <div className="col-md-9 g-0 chatsList">
            <ChatSpaceHeader/>
            <MsgWrapperScroll>
                <InputMsgLowerBar handleFirstNextMessage={handleFirstNextMessage}/>
                <MsgScrollerGood>
                    {currentFeed && currentFeed.length > 0 ? (
                        currentFeed.map((msg, index) => {
                            console.log("msg.sender.username ", msg.sender.username, " activeUser.username ", activeUser.username);
                            if (msg.sender.username === activeUser.username) {
                                return (
                                    <UserSelfMsg
                                        activeUser={activeUser}
                                        key={index}
                                        msg={{
                                            text: msg.content,
                                            timeAndDate: formatTimestamp(msg.created)
                                        }}
                                    />
                                );
                            } else {
                                const contact = filteredContacts.find(
                                    (contact) => contact.name === msg.sender.username
                                );
                                const profilePic = contact?.profilePic;
                                console.log(profilePic)
                                return (
                                    <ContactResponseMsg
                                        contact={{
                                            profilePic: profilePic,
                                            content: msg.content,
                                            timeAndDate: formatTimestamp(msg.created)
                                        }}
                                        key={index}
                                    />
                                );
                            }
                        })
                    ) : (
                        <div>No messages to display</div>
                    )}
                </MsgScrollerGood>
            </MsgWrapperScroll>
        </div>
    );
}

export default ConversationSpace;
