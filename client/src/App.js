import React, {useEffect, useState} from 'react'
import {Route, Routes, useNavigate, useLocation} from 'react-router-dom'
import {Dashboard, Music, Home, Login, MusicPlayer} from './components'
import MyFavorite from './components/MyFavorite/MyFavorite';

import {app} from './config/firebase.config'

import {getAuth} from 'firebase/auth'

import {AnimatePresence, motion} from 'framer-motion'
import {validateUser} from './api'
import {useStateValue} from './context/StateProvider'
import {actionType} from './context/reducer'
import MainLayout from "./components/MainLayout";
import Register from "./components/login/Register";
import UserProfile from "./components/profile/UserProfile";

const App = () => {
    const firebaseAuth = getAuth(app);
    const navigate = useNavigate();
    const location = useLocation();

    const [{user, isSongPlaying}, dispatch] = useStateValue();

    const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true");

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((userCred) => {
            if (userCred) {
                userCred.getIdToken().then((token) => {
                    validateUser(token).then((data) => {
                        dispatch({
                            type: actionType.SET_USER,
                            user: data,
                        });
                    });
                });
            } else {
                setAuth(false);
                window.localStorage.setItem("auth", "false");
                dispatch({
                    type: actionType.SET_USER,
                    user: null,
                });
                navigate("/login")
            }
        });
    }, []);

    return (
        <AnimatePresence exitBeforeEnter>
            <div className='h-auto min-w-[680px] bg-primary flex flex-col justify-center items-center'>

                <Routes>
                    {/* Layout có header, không áp dụng cho /login */}
                    {/* Hiển thị header nếu không phải trang login */}
                    {location.pathname !== "/login" ? (
                        <Route element={<MainLayout/>}>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/musics" element={<Music/>}/>
                            <Route path="/favorites" element={<MyFavorite/>}/>

                        </Route>
                    ) : null}

                    {/* Trang login không có Header */}
                    <Route path="/login" element={<Login setAuth={setAuth}/>}/>
                    <Route path="/register" element={<Register setAuth={setAuth}/>}/>
                    {/* User Profile */}
                    <Route path="/userProfile" element={<UserProfile />}/>

                    {/* Music Player */}
                    {/* Admin Dashboard */}
                    <Route path="/dashboard/*" element={<Dashboard/>}/>
                </Routes>

                {isSongPlaying && (
                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        className="fixed min-w-[700px] h-26 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center"
                    >
                        <MusicPlayer/>
                    </motion.div>
                )}

            </div>
        </AnimatePresence>
    )
}

export default App;