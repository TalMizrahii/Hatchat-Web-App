import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';
import LoginScreen from './LoginScreen/LoginScreen';
import ChatScreen from './ChatScreen/ChatScreen';
import RegistrationScreen from './RegistrationScreen/RegistrationScreen';

const App = () => {
        const [currentUsernameAndToken, setCurrentUsernameAndToken] = useState(null);

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

            // newUser.profilePicture = 'https://images.squarespace-cdn.com/content/v1/5c76de607fdcb8facd765433/1592926322727-OL8OFAUGXH0Q5XMF6AXC/IMG-4874.JPG';
            await handleUserToServer(newUser);
            // users.push(newUser);
            navigate('/');
        };

        async function handleUserToServer(newUser) {
            const data = {
                "username": newUser.userName.toString(),
                "password": newUser.password.toString(),
                "displayName": newUser.fullName.toString(),
                "profilePic": newUser.profilePicture,
            };

            const res = await fetch('http://localhost:5000/api/Users', {
                'method': 'post',
                'headers': {
                    'Content-Type': 'application/json',
                },
                'body': JSON.stringify(data)
            });

            if (res.ok) {
                const responseData = await res.text();
                console.log("creation res: ", responseData);
                alert("created successfully");
            } else {
                const responseData = await res.text();
                console.log("creation res: ", responseData);
                alert("Error during creation.")
            }

        }

        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Outlet/>}>
                        <Route path="/" element={<LoginScreen setCurrentUsernameAndToken={setCurrentUsernameAndToken}/>}/>
                        <Route path="/chat" element={<ChatScreen currentUsernameAndToken={currentUsernameAndToken}/>}/>
                        <Route path="/register" element={<RegistrationScreen handleCreateAccount={handleCreateAccount}/>}/>
                    </Route>
                </Routes>
            </Router>
        );
    }
;

ReactDOM.render(<App/>, document.getElementById('root'));