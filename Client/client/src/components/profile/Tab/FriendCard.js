import React from 'react'
import { Link } from 'react-router-dom'

import styles from './FriendCard.module.css'

const FriendCard = ({user}) => {
    return (
        <Link className={styles.container} to={`/profile/${user._id}`} >
            <div className={styles.image_wrapper}>
                <img className={styles.image} src={user.avatar} />
            </div>
            <div className={styles.name}>{user.username}</div>
        </Link>
    )
}

export default FriendCard
