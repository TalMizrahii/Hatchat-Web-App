function PasswordInput({ onChange }) {

    return (
        <div className="form-floating mb-3">
            <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={onChange}
            />
            <label htmlFor="floatingPassword">Password</label>
        </div>
    );
}

export default PasswordInput;