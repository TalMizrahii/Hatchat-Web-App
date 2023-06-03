import React from 'react';

function CreateAccountBtn({ handleCreate}) {
    const handleClick = () => {
        handleCreate();
    };

    return (
        <div>
            <button className="btn btn-primary" id="subButton" type="submit" onClick={handleClick}>
                Create account
            </button>
        </div>
    );
}

export default CreateAccountBtn;