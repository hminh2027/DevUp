import React from 'react'
import { Link } from 'react-router-dom'

import UserCard from '../util/UserCard'
import FollowBtn from '../profile/FollowBtn'

import styles from './LikePostModal.module.css'

const LikeModal = ({likes}) => {

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <div className={styles.title}>People like this post</div>
            </div>
            <div className={styles.content}>
                {likes.map(user=>(
                    <div  key={user._id} className={styles.item_wrapper}>
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

export default LikeModal
