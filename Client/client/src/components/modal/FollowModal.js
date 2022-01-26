import React from 'react'
import { Link } from 'react-router-dom'
import FollowBtn from '../profile/FollowBtn'
import UserCard from '../util/UserCard'

import styles from './FollowModal.module.css'

const FollowModal = ({title, list}) => {

    return (
        <div className={styles.container}>
            <div className={styles.heading}>{title}</div>
            <div className={styles.content}>
                {list.map(user=>(
                    <div key={user._id} className={styles.item_wrapper}>
                        <Link className={styles.item} to={`/profile/${user._id}`}>
                            <UserCard height='3rem' color='#64BDF1' avatar={user.avatar} username={user.username}/>
                        </Link>
                        <FollowBtn user={user}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FollowModal
