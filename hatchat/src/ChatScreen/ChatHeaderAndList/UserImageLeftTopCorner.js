function UserImageLeftTopCorner({profilePicture}) {
    return (
        <div className="user-img">
            <img className="dp"
                 src={profilePicture}
                 alt=""></img>
        </div>
    );
}

export default UserImageLeftTopCorner;