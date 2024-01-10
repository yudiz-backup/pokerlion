import React from 'react'
import logo from '../assets/images/logo.png'

function Loading() {
    return (
        <div className="loader">
            <div className="load-img">
                <img src={logo} alt="logo" />
            </div>
            <div className="load-me">
                <span className="dot"></span>
                <div className="dots">
                    <span></span> <span></span> <span></span>
                </div>
            </div>
        </div>
    )
}

export default Loading
