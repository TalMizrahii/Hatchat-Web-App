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

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const navigate = useNavigate();
    const handleLogin = (event) => {
        event.preventDefault();
        const user = users.find((user) => user.userName === username);
        if (user) {
            if (user.password === password) {
                navigate('/chat', {
                    state: {
                        fullName: user.fullName, userName: user.userName,
                        userPassword: user.password,
                        profilePicture: user.profilePicture
                    }
                });
            } else {
                alert('Invalid password');
            }
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <>
            <GeneralBackground/>
            <RegisterBox>
                <form>
                    <UserNameInput handleUserNameClick={handleUsernameChange}/>
                    <PasswordInput onChange={handlePasswordChange}/>
                    <LoginButton handleLogin={handleLogin}/>
                    <DisclaimerText/>
                </form>
            </RegisterBox>
        </>
    );
}

export default LoginScreen;