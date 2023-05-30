import ChatSpaceHeader from "./ChatSpaceHeader";
import MsgWrapperScroll from "./MsgWrapperScroll";
import InputMsgLowerBar from "./inputMsgLowerBar";
import MsgScrollerGood from "./MsgScrollerGood";
import ContactResponseMsg from "./ContactResponseMsg";
import UserSelfMsg from "./UserSelfMsg";
import ContactMsg from "../../DataBase/contactMsg";
import {useState} from "react";

function ConversationSpace({currentFeed, activeUser, handleNewMessage, currentContactId}) {
    const handleFirstNextMessage = (content) => {
        if (currentContactId === -1) {
            return;
        }
        handleNewMessage(content);
    }

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
                        currentFeed.map((msg, index) => (
                            <UserSelfMsg
                                activeUser={activeUser}
                                key={index}
                                msg={{
                                    sender: msg.sender,
                                    text: msg.content,
                                    timeAndDate: msg.created,
                                }}
                            />
                        ))
                    ) : (
                        <div>No messages to display</div>
                    )}
                </MsgScrollerGood>

            </MsgWrapperScroll>
        </div>
    );
}

export default ConversationSpace;
