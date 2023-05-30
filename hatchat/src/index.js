import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Outlet, Route, Routes} from 'react-router-dom';
import LoginScreen from './LoginScreen/LoginScreen';
import ChatScreen from './ChatScreen/ChatScreen';
import RegistrationScreen from './RegistrationScreen/RegistrationScreen';

const App = () => {
    const [currentUsernameAndToken, setCurrentUsernameAndToken] = useState({
        username: '-1',
        displayName: '-1',
        profilePic: 'avatar 1'
    });

    const handleCreateAccount = async (
        fullName,
        profilePictureFile,
        password,
        confirmPassword,
        userName,
        navigate
    ) => {
        if (fullName === '' || password === '' || confirmPassword === '' || userName === '') {
            alert('Please fill in all the required fields.');
            return;
        }

        const newUser = {
            fullName,
            userName,
            password,
            profilePicture: '',
        };

        const reader = new FileReader();
        reader.onload = () => {
            newUser.profilePicture = reader.result;
            handleUserToServer(newUser, navigate);
        };
        reader.readAsDataURL(profilePictureFile);
    };

    async function handleUserToServer(newUser, navigate) {
        const data = {
            username: newUser.userName.toString(),
            password: newUser.password.toString(),
            displayName: newUser.fullName.toString(),
            profilePic: newUser.profilePicture,
        };

        const res = await fetch('http://localhost:5000/api/Users', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            const responseData = await res.text();
            console.log('creation res: ', responseData);
            alert('created successfully');
            navigate('/');
        } else {
            const responseData = await res.text();
            console.log('creation res: ', responseData);
            alert('Error during creation.');
        }
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Outlet/>}>
                    <Route
                        path="/"
                        element={<LoginScreen setCurrentUsernameAndToken={setCurrentUsernameAndToken}/>}
                    />
                    <Route
                        path="/chat"
                        element={<ChatScreen currentUsernameAndToken={currentUsernameAndToken}/>}
                    />
                    <Route
                        path="/users"
                        element={<RegistrationScreen handleCreateAccount={handleCreateAccount}/>}
                    />
                </Route>
            </Routes>
        </Router>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
