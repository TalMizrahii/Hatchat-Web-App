import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Routes, Route, Outlet, Navigate} from 'react-router-dom';
import LoginScreen from './LoginScreen/LoginScreen';
import ChatScreen from './ChatScreen/ChatScreen';
import RegistrationScreen from './RegistrationScreen/RegistrationScreen';
import {users} from "./DataBase/Database";

const App = () => {

    const [currentUser, setCurrentUser] = useState(null);

        const handleCreateAccount = async (
            fullName,
            profilePicture,
            password,
            confirmPassword,
            userName,
            navigate
        ) => {
            if (
                fullName === '' ||
                password === '' ||
                confirmPassword === '' ||
                userName === ''
            ) {
                alert('Please fill in all the required fields.');
                return;
            }
            const newUser = {
                fullName,
                userName,
                password,
                profilePicture,
            };
            await handleUserToServer(newUser);
            // users.push(newUser);
            navigate('/');
        };

        async function handleUserToServer(newUser) {
            // Check if the user added a profile picture.
            if (!newUser.profilePicture) {
                // If not, set a default pic.
                newUser.profilePicture = 'https://images.squarespace-cdn.com/content/v1/5c76de607fdcb8facd765433/1592926322727-OL8OFAUGXH0Q5XMF6AXC/IMG-4874.JPG';
            }
            const data = {
                "username": newUser.userName.toString(),
                "password": newUser.password.toString(),
                "displayName": newUser.fullName.toString(),
                "profilePic": newUser.profilePicture.toString(),
            };

            const res = await fetch('http://localhost:5000/api/Users', {
                'method': 'post',
                'headers': {
                    'Content-Type': 'application/json',
                },
                'body': JSON.stringify(data)
            });
            const responseData = await res.json(); // Parse the response body
            console.log("creation res: ", responseData.text);
        }


        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Outlet/>}>
                        <Route path="/" element={<LoginScreen setCurrentUser={setCurrentUser}/>}/>
                        <Route path="/chat" element={<ChatScreen currentUser={currentUser}/>}/>
                        <Route path="/register" element={<RegistrationScreen handleCreateAccount={handleCreateAccount}/>}/>
                    </Route>
                </Routes>
            </Router>
        );
    }
;

ReactDOM.render(<App/>, document.getElementById('root'));