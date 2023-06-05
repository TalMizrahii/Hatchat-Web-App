import React from "react";

function ContactResponseMsg({ contact }) {
    return (
        <div className="chatText d-flex flex-row justify-content-start">
            <img className="chatImg" src={contact.profilePic} alt="avatar 1" />
            <div>
                <p
                    className="ContentMsg small p-2 ms-3 mb-1 rounded-3"
                    style={{ backgroundColor: "#f5f6f7" }}
                >
                    {contact.content}
                </p>
                <p className="small ms-3 mb-3 rounded-3 text-muted timeHourContact">
                    {contact.timeAndDate}
                </p>
            </div>
        </div>
    );
}

export default ContactResponseMsg;
