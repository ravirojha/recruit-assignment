import React, {createContext, useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Toast from "./components/atoms/Toast";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import CompanyList from "./pages/company-list";
import NotFound from "./pages/not-found";
import Logout from "./components/atoms/logout";

export const AuthContext = createContext();

function App() {
    const [user, setUser] = useState(null);
    const [cookies, setCookie] = useCookies(["user"])
    useEffect(() => {
        if (!user) {
            if (cookies.user) {
                setUser(cookies.user);
            }
        }
    }, [cookies.user, user]);


    return (
        <>
            <AuthContext.Provider value={{user, setUser}}>
                <Toast/>
                <Router>
                    {user && <Logout/>}
                    <Routes>
                        {!user &&
                        <>
                            <Route path={'/login'} element={<Login/>}/>
                            <Route path={'/signup'} element={<SignUp/>}/>
                        </>}

                        {user && <>
                            <Route path={'/'} element={<CompanyList/>}/>
                        </>}

                        <Route path={'/'} element={<Login/>}/>
                        <Route path={'/not-found'} element={<NotFound/>}/>
                        <Route path={'*'} element={<NotFound/>}/>
                    </Routes>
                </Router>
            </AuthContext.Provider>
        </>
    );
}

export default App;
