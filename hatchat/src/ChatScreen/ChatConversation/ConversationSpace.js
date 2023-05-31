import ChatSpaceHeader from "./ChatSpaceHeader";
import MsgWrapperScroll from "./MsgWrapperScroll";
import InputMsgLowerBar from "./inputMsgLowerBar";
import MsgScrollerGood from "./MsgScrollerGood";
import UserSelfMsg from "./UserSelfMsg";
import ContactResponseMsg from "./ContactResponseMsg";
import { useState } from "react";
import { format } from "date-fns";

function ConversationSpace({ currentFeed, activeUser, handleNewMessage, currentContactId }) {
    const handleFirstNextMessage = (content) => {
        if (currentContactId === -1) {
            return;
        }
        handleNewMessage(content);
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return format(date, "MMM d 'at' hh:mm aa");
    };

    if (currentContactId === -1) {
        return (
            <div className="col-md-9 g-0 chatsList">
                <ChatSpaceHeader />
                <MsgWrapperScroll>
                    <InputMsgLowerBar handleFirstNextMessage={handleFirstNextMessage} />
                    <MsgScrollerGood>
                        <div> No messages to display</div>
                    </MsgScrollerGood>
                </MsgWrapperScroll>
            </div>
        );
    }

    return (
        <div className="col-md-9 g-0 chatsList">
            <ChatSpaceHeader />
            <MsgWrapperScroll>
                <InputMsgLowerBar handleFirstNextMessage={handleFirstNextMessage} />
                <MsgScrollerGood>
                    {currentFeed && currentFeed.length > 0 ? (
                        currentFeed.map((msg, index) => {
                            if (msg.sender.username === activeUser.username) {
                                return (
                                    <UserSelfMsg
                                        activeUser={activeUser}
                                        key={index}
                                        msg={{
                                            sender: msg.sender,
                                            text: msg.content,
                                            timeAndDate: formatTimestamp(msg.created),
                                        }}
                                    />
                                );
                            } else {
                                return (
                                    <ContactResponseMsg
                                        currentContact={msg.sender}
                                        key={index}
                                        timeAndDate={formatTimestamp(msg.created)}
                                    >
                                        {msg.content}
                                    </ContactResponseMsg>
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
