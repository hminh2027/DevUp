import React, { useState } from 'react'

import FollowingBar from './Follow/FollowingBar'
import FollowerBar from './Follow/FollowerBar'

import styles from './FollowBar.module.css'

const FollowBar = ({profile}) => {
    const [isFollowing, setIsFollowing] = useState(true)
    
    return (
        <>
            <div className={styles.heading}>
                <div onClick={()=> setIsFollowing(!isFollowing)} className={styles.title}>{isFollowing ? ' Following ' : 'Followers'}</div>
                <div className={styles.value}>
                    {isFollowing ? (!profile.user.following ? 0 : profile.user.following.length) : (!profile.user.followers ? 0 : profile.user.followers.length)}
                </div>
            </div>
            <div className={styles.list_items}>
                <FollowingBar profile={profile} isFollowing={isFollowing} />
                <FollowerBar profile={profile} isFollowing={isFollowing} />
            </div>
        </>
    )
}

export default FollowBar
