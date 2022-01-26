import React from 'react'
import styles from './MessageCard.module.css'

const MessageCard = () => {
    return (
        <div className="message_card">
            <div className="avatar"></div>
            <div className="body">
                <div className="heading">
                    <div className="name">Minh</div>
                    <div className="time">2d</div>
                </div>
            </div>
            <div className="dot"></div>
        </div>
    )
}

export default MessageCard
