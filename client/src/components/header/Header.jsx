import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { Logo } from '../../assets/img'
import { isActiveStyles, isNotActiveStyles } from '../../utils/styles'
import { FaCrown } from 'react-icons/fa'
import { useStateValue } from '../../context/StateProvider'

import { app } from '../../config/firebase.config'
import { getAuth } from 'firebase/auth'

import { motion } from 'framer-motion'


export const Header = () => {
    const [{ user }, dispatch] = useStateValue();
    const [isMenu, setisMenu] = useState(false);

    const navigate = useNavigate()

    const logOut = () => {
        const firebaseAuth = getAuth(app);
        firebaseAuth.signOut().then(() => {
            window.localStorage.setItem("auth", "false");
        }).catch((e) => console.log(e));
        navigate("/login", { replace: true })
    }
    return (
        <header className='w-full h-auto flex items-center w-full p-4 md:py-2 md:px-6'>
            {/*Logo*/}
            <NavLink to={"/"}>
                <img src={Logo} alt="Logo" className='w-16' />
            </NavLink>
            {/*Navigation */}
            <ul className='flex items-center justify-center ml-7'>
                <li className='ms-5 text-lg'><NavLink to={'/'}
                    className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Home</NavLink>
                </li>
                <li className='ms-5 text-lg'><NavLink to={'/musics'}
                    className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Music</NavLink>
                </li>
            </ul>
            {/*Profile*/}
            <div
                onMouseEnter={() => setisMenu(true)}
                onMouseLeave={() => setisMenu(false)}
                className='flex items-center ml-auto cursor-pointer gap-2 relative'>
                <img src={user?.user.imageUrl} className='w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg'
                    alt="" referrerPolicy='no-referrer' />
                <div className='flex flex-col'>
                    <p className='text-textColor text-lg hover:text-headingColor font-semibold'>{user?.user?.name}</p>
                    <p className='flex items-center gap-2 text-xs text-gray-500 font-normal'>Premium Member. <FaCrown
                        className='text-sm -m-1 text-yellow-500' /></p>
                </div>

                {isMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className='absolute z-10 flex flex-col p-3 top-12 right-0 w-275 gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm'
                    >
                        <NavLink to={'/userProfile'}>
                            <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'> Profile</p>
                        </NavLink>

                        <NavLink to="/favorites">
                            <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'> My Favourites</p>
                        </NavLink>



                        <hr />

                        {user?.user?.role === "admin" && (
                            <>
                                <NavLink to={"/dashboard/home"}>
                                    <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'> Dashboard </p>
                                </NavLink>
                                <hr />
                            </>
                        )}

                        <p
                            className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out cursor-pointer'
                            onClick={logOut}
                        >
                            Sign Out
                        </p>
                    </motion.div>
                )}


            </div>
        </header>
    )
}

export default Header