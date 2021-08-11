import React from 'react'
import './Suggestions.css'
import avatar3 from './images/avatar3.PNG'

function Suggestions({ username }) {
    return (
        <div className="suggestions-container">
            <div className="suggestions-user-img">
                <img src={avatar3} alt="" />
            </div>
            <div className="suggestions-user-name">
                {username}
            </div>
            <div className="suggestions-follow">
                <button>Follow</button>
            </div>

        </div>

    )
}

export default Suggestions
