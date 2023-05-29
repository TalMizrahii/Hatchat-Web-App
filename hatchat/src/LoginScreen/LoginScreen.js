import './LoginScreen.css';
import GeneralBackground from '../GeneralComponents/GeneralBackground';
import LoginButton from "./LoginButton";
import UserNameInput from "./UserNameInput";
import {useState} from 'react';
import DisclaimerText from "../GeneralComponents/DisclaimerText";
import RegisterBox from "../GeneralComponents/RegisterBox";
import PasswordInput from "./PasswordInput";
import {users} from "../DataBase/Database";
import {useNavigate} from "react-router-dom";


function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        const credentials = {
            "username": username.toString(),
            "password": password.toString()
        };

        // Send the credentials to the server.
        fetch('http://localhost:5000/api/Tokens', {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': JSON.stringify(credentials)
        }).then(data => {
                console.log("data: " + data.text());
                if (!data.ok) {
                    // Display an error message.
                    alert("Invalid username or password");
                } else {
                    // Navigate to the home page.
                    navigate('/chat', {
                        state: {
                            fullName: username,
                            userName: username,
                            userPassword: password,
                            profilePicture: username
                        }
                    });
                }
            });
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