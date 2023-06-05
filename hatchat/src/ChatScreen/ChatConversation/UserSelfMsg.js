import React from "react";

function UserSelfMsg({ msg, activeUser }) {
    return (
        <div className="chatText d-flex flex-row justify-content-end">
            <div>
                <p className="ContentMsg small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                    {msg.text}
                </p>
                <p className="small me-3 mb-3 rounded-3 text-muted float-end">
                    {msg.timeAndDate}
                </p>
            </div>
            <img
                className="chatImg"
                src={activeUser.profilePic}
                alt="avatar 1"
            />
        </div>
    );
}

export default UserSelfMsg;
