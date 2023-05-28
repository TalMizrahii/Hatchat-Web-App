import React from 'react';

function UserNameInput({ handleUserNameClick }) {
    const handleUserNameChange = (e) => {
        handleUserNameClick(e);
    };

    return (
        <div className="form-floating mb-3">
            <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={handleUserNameChange}
            />
            <label htmlFor="floatingInput">Username</label>
        </div>
    );
}

export default UserNameInput;