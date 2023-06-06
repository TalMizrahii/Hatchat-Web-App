import React from 'react';

function ProfilePictureText({ handlePicClick }) {
    const handleFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        const regex = /([^\\s]+(\.(?:jpe?g|png|gif|bmp))$)/i;

        if (file && regex.test(file.name)) {
            const fileSizeInBytes = file.size;
            const fileSizeInKB = fileSizeInBytes / 1024; // Convert to kilobytes
            console.log("file size", fileSizeInKB)
            if (fileSizeInKB > 70) {
                alert('Please select an image file that is 74 KB or smaller.');
                e.target.value = '';
                return;
            }

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
