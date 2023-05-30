import './LoginScreen.css';
import GeneralBackground from '../GeneralComponents/GeneralBackground';
import LoginButton from "./LoginButton";
import UserNameInput from "./UserNameInput";
import {useState} from 'react';
import DisclaimerText from "../GeneralComponents/DisclaimerText";
import RegisterBox from "../GeneralComponents/RegisterBox";
import PasswordInput from "./PasswordInput";
import {useNavigate} from "react-router-dom";


function LoginScreen({setCurrentUsernameAndToken}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = {
            "username": username,
            "password": password,
        };

        // Send the credentials to the server.
        const res = await fetch('http://localhost:5000/api/Tokens', {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': JSON.stringify(credentials)
        })
        if (!res.ok) {
            // Display an error message.
            alert("Invalid username or password");
        } else {
            const token = await res.text();
            const tokenStatement = "Bearer " + token;
            // console.log("token: " + token);
            setCurrentUsernameAndToken({
                username: username,
                token: tokenStatement,
            })
            // Navigate to the home page.
            navigate('/chat');
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <>
            <GeneralBackground/>
            <RegisterBox>
                <form>
                    <UserNameInput handleUserNameClick={handleUsernameChange}/>
                    <PasswordInput onChange={handlePasswordChange}/>
                    <LoginButton handleLogin={handleSubmit}/>
                    <DisclaimerText/>
                </form>
            </RegisterBox>
        </>
    );
}

export default LoginScreen;