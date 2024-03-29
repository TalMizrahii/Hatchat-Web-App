import React, {useState} from 'react';
import './RegistrationScreen.css';
import GeneralBackground from '../GeneralComponents/GeneralBackground';
import RegisterBox from '../GeneralComponents/RegisterBox';
import UserNameInput from '../LoginScreen/UserNameInput';
import ConfirmPasswordInput from './ConfirmPasswordInput';
import FullNameInput from './FullNameInput';
import ProfilePictureText from './ProfilePictureText';
import CreateAccountBtn from './CreateAccountBtn';
import PasswordInputAndReq from './PasswordInputAndReq';
import {useNavigate} from 'react-router-dom';



function RegistrationScreen({handleCreateAccount}) {
    const [fullName, setFullName] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);

    const navigate = useNavigate();


    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (confirmPassword !== '' && e.target.value !== '' && confirmPassword === e.target.value) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
    };

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handleProfilePictureChange = (file) => {
        setIsImageUploaded(true);
        setProfilePicture(file);
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        if (newConfirmPassword !== '' && password !== '' && newConfirmPassword === password) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
    };

    const handleCreateAccountClick = () => {
        setFullName('');
        setPassword('');
        setConfirmPassword('');
        setUserName('');
        setProfilePicture(null);
        setIsImageUploaded(false);
        handleCreateAccount(fullName, profilePicture, password, confirmPassword, userName, navigate);
    };

    return (
        <>
            <GeneralBackground/>
            <RegisterBox>
                <FullNameInput handleFullNameClick={handleFullNameChange}/>
                <PasswordInputAndReq onChange={handlePasswordChange} password={password}/>
                <ConfirmPasswordInput
                    password={password}
                    handleConfirmPasswordChange={handleConfirmPasswordChange}
                    confirmPassword={confirmPassword}
                    passwordMatch={passwordMatch}/>
                <UserNameInput handleUserNameClick={handleUserNameChange}/>
                <ProfilePictureText handlePicClick={handleProfilePictureChange}/>
                <CreateAccountBtn handleCreate={handleCreateAccountClick} />
            </RegisterBox>
        </>
    );
}

export default RegistrationScreen;