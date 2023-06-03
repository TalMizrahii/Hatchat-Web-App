import React, { useState } from 'react';
import Popup from "../GeneralComponents/Popup";

function PasswordInputAndReq({onChange,password}) {
    const [showPopup, setShowPopup] = useState(false);

    const handleShowPopup = () => {
        setShowPopup(true);
    };

    const handleHidePopup = () => {
        setShowPopup(false);
    };




    return (
        <div className="form-floating mb-3 position-relative">
            <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onFocus={handleShowPopup}
                onBlur={handleHidePopup}
                onChange={onChange}
            />
            <label htmlFor="floatingPassword">Password</label>
            {showPopup && <Popup password={password} />}
        </div>
    );
}

export default PasswordInputAndReq;