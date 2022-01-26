import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'

import UserCard from '../../util/UserCard'
import FollowBtn from '../FollowBtn'

import styles from './FollowerBar.module.css'

const FollowerBar = ({isFollowing, profile}) => {
    const {auth} = useSelector(state=>state);

    return (
        <div className={`${styles.follower_bar} ${!isFollowing && styles.translate_left}`}>
            {profile.user.followers && profile.user.followers.map(user => 
                <div key={user._id} className={styles.item_wrapper}>
                    <Link to={`/profile/${user._id}`} className={styles.item}>
                        <UserCard height='3rem' avatar={user.avatar} username={user.username}/>
                    </Link>
                    {user._id !== auth.user._id && (
                        <FollowBtn user={user}/>
                    )}                           
                </div>  
            )} 
        </div>
    )
}

export default FollowerBar
