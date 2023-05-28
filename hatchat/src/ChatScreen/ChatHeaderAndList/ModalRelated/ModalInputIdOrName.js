import React from "react";

function ModalInputIdOrName({ label, placeholder, name, value, onChange }) {
    return (
        <div className="modalInput input-group rounded">
            <input
                type="text"
                className="form-control rounded"
                placeholder={placeholder}
                aria-label={label}
                aria-describedby={`${name}-addon`}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default ModalInputIdOrName;
