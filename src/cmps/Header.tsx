import React, { Component, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import MenuIcon from '@material-ui/icons/Menu';

export const Header: React.FC = () => {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        // window.addEventListener('resize', toggleLinks);
        console.log(open);
    }, [open])

    // const toggleLinks = (ev) => {
    //     // console.log(ev.target.innerWidth);
    //     if (ev.target.innerWidth < 720) setOpen(false)
    //     else setOpen(true)
    // }
    const onOpenNavbar = () => {
        console.log('open');
        setOpen(true)
    }
    return (
        <header className="app-header">
            <div className={open ? 'main-screen open' : 'main-screen'} onClick={() => setOpen(false)}></div>
            <nav className="main-nav flex space-between">
                <NavLink exact to="/"><span>Home</span></NavLink>
                <nav className={open ? 'links open flex' : 'links flex'}>
                    <NavLink to="/info">User info</NavLink>
                </nav>
                <MenuIcon className="hamburger" onClick={onOpenNavbar}></MenuIcon>
            </nav>
        </header>
    )

}
