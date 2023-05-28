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

function LoginScreen({setPassword, setUsername, handleLogin}) {

    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLoginCheck = () =>{
        handleLogin(navigate);
    }
    return (
        <>
            <GeneralBackground/>
            <RegisterBox>
                <form>
                    <UserNameInput handleUserNameClick={handleUsernameChange}/>
                    <PasswordInput onChange={handlePasswordChange}/>
                    <LoginButton handleLogin={handleLoginCheck}/>
                    <DisclaimerText/>
                </form>
            </RegisterBox>
        </>
    );
}

export default LoginScreen;