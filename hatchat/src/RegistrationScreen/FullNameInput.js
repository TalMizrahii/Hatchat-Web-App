function FullNameInput({handleFullNameClick}) {
    return (
        <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingInputName" placeholder="name@example.com"
                   onChange={handleFullNameClick}></input>
            <label htmlFor="floatingInput">Full name</label>
        </div>
    );
}

export default FullNameInput;