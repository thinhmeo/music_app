import React from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'

import { IoHome } from "react-icons/io5"
import { IoReturnUpBack } from "react-icons/io5";
import { isActiveStyles, isNotActiveStyles } from '../../utils/styles'
import DashboardHome from './DashboardHome'
import DashboardUsers from './DashboardUsers'
import DashboardSongs from './DashboardSongs'
import DashboardAlbums from './DashboardAlbums'
import DashboardArtists from './DashboardArtists'
import DashBoardNewSong from './DashBoardNewSong'
import Alert from './Alert'
import { useStateValue } from '../../context/StateProvider'

const Dashboard = () => {

    const [{ alertType }, dispath] = useStateValue();
    return (
        <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'>
            {/*Navigation header*/}
            <div className='w-[60%] my-2 p-4 flex items-center justify-evenly'>
                <NavLink to={"/"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}><IoReturnUpBack className='text-2xl text-textColor' /> Back to Home</NavLink>
                <NavLink to={"/dashboard/home"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}><IoHome className='text-2x1 text-textColor' /> </NavLink>
                <NavLink to={"/dashboard/user"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Users</NavLink>
                <NavLink to={"/dashboard/songs"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Songs</NavLink>
                <NavLink to={"/dashboard/artists"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Artists</NavLink>
                <NavLink to={"/dashboard/albums"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Albums</NavLink>
            </div>


            {/*Dashboard route*/}
            <div className='my-4 w-full p-4'>
                <Routes>
                    <Route path='/home' element={<DashboardHome />} />
                    <Route path='/user' element={<DashboardUsers />} />
                    <Route path='/songs' element={<DashboardSongs />} />
                    <Route path='/artists' element={<DashboardArtists />} />
                    <Route path='/albums' element={<DashboardAlbums />} />
                    <Route path='/newSong' element={<DashBoardNewSong />} />
                </Routes>
            </div>

            {alertType && (
                <Alert type={alertType} />
            )}
        </div>
    )
}

export default Dashboard