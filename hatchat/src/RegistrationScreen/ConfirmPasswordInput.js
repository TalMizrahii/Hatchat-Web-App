import React, { useState } from 'react';

function ConfirmPasswordInput({ password, handleConfirmPasswordChange, confirmPassword, passwordMatch }) {
    const getFormControlClass = () => {
        let className = 'form-control';
        if (confirmPassword !== '' && !passwordMatch) {
            className += ' is-invalid';
        } else if (confirmPassword !== '' && passwordMatch) {
            className += ' is-valid';
        }
        return className;
    };

    return (
        <div className={`form-floating mb-3 ${confirmPassword !== '' && passwordMatch ? 'has-validation' : ''}`}>
            <input
                type="password"
                className={getFormControlClass()}
                id="floatingPasswordConform"
                placeholder="Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
            />
            <label htmlFor="floatingPassword">Confirm Password</label>
            {confirmPassword !== '' && password !== '' && passwordMatch && (
                <div className="valid-feedback">
                    <i className="bi bi-check-circle-fill"></i>
                </div>
            )}
            {confirmPassword !== '' && password !== '' && !passwordMatch && (
                <div className="invalid-feedback">Passwords do not match.</div>
            )}
        </div>
    );
}

export default ConfirmPasswordInput;