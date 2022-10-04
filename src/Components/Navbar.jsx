import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import dumbellIcon from "../assets/dumbellIcon.png"

export default function Navbar(props) {

    return (
        <nav className='navbar'>
            <Link className={`link ${props.selected.pathname === "/" ? "selected" : ""}`} to="/">Routine</Link>
            <img className='logo' src={dumbellIcon} />
            <Link className={`link ${props.selected.pathname === "/timer" ? "selected" : ""}`} to="/timer">Timer</Link>
        </nav>
    )
}