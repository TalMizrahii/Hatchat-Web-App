function AddContactIcon({children}) {
    return (
        <button type="button" id="add-button" className="btn modal-button btn-no-pointer" data-bs-toggle="modal"
                data-bs-target="#exampleModal">
            <li className="gg-user-add"></li>
        </button>
    );
}

export default AddContactIcon;