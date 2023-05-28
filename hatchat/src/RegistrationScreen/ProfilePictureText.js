import React from 'react';

function ProfilePictureText({ handlePicClick }) {
    const handleFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        const regex = /([^\\s]+(\.(?:jpe?g|png|gif|bmp))$)/i;

        if (file && regex.test(file.name)) {
            handlePicClick(file);
        } else {
            alert('Please select a valid image file (JPG, JPEG, PNG, GIF, BMP).');
            e.target.value = '';
        }
    };

    return (
        <div className="mb-3">
            <label htmlFor="formFile" className="form-label profilePictureLabel">
                Profile picture:
            </label>
            <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={handleFileChange}
            />
        </div>
    );
}

export default ProfilePictureText;