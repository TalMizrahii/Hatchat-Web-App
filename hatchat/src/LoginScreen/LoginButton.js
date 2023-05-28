function LoginButton({handleLogin}) {

    return (
        <button type="submit" className="btn btn-large btn-primary" onClick={handleLogin}>
            Log In
        </button>
    );
}

export default LoginButton;