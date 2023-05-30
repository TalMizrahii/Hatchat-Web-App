function UserImageLeftTopCorner({ activeUser }) {

    // Render the user image when activeUser is not null and has a profilePic
    return (
        <div className="user-img">
            <img className="dp" src={activeUser.profilePic} alt="avatar 1" />
        </div>
    );
}

export default UserImageLeftTopCorner;