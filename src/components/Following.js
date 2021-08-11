import React from 'react'
import './Following.css'
import img18 from './images/img18.jpg'

function Following({ username }) {
    return (
        <div className="following-container">
            <div className="following-image-container">
                <div className="following-image">
                    <img src={img18} alt="" />
                </div>

            </div>
            <div className="following-name">
                {username}
            </div>
        </div>
    )
}

export default Following
