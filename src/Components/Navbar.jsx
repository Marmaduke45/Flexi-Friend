import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import dumbellIcon from "../assets/dumbell Icon.png"

export default function Navbar(props) {

    return (
        <nav className='navbar'>
            <img src={dumbellIcon} />
            <Link className={`link ${props.selected.pathname === "/" ? "selected" : ""}`} to="/">Routine</Link>
            <Link className={`link ${props.selected.pathname === "/timer" ? "selected" : ""}`} to="/timer">Timer</Link>
        </nav>
    )
}