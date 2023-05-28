import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Routes, Route, Outlet, Navigate} from 'react-router-dom';
import LoginScreen from './LoginScreen/LoginScreen';
import ChatScreen from './ChatScreen/ChatScreen';
import RegistrationScreen from './RegistrationScreen/RegistrationScreen';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Outlet/>}>
                    <Route path="/" element={<LoginScreen setLoggedIn={setLoggedIn}/>}/>
                    <Route path="/chat" element={loggedIn ? <ChatScreen/> : <Navigate to="/" replace/>}/>
                    <Route path="/register" element={<RegistrationScreen/>}/>
                </Route>
            </Routes>
        </Router>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
