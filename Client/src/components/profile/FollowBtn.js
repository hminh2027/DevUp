import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { follow, unfollow } from '../../store/actions/profileAction'

import styles from './FollowBtn.module.css'

const FollowBtn = ({user}) => {
    const dispatch = useDispatch()

    const [followed, setFollowed] = useState(false)
    const [load, setLoad] = useState(false)

    const {auth, socket} = useSelector(state=>state)

    useEffect(()=>{
        if(auth.user.following.find(item => item._id === user._id)){
            setFollowed(true)
        }
        else return () => setFollowed(false)
    
    },[auth.user.following, user._id])

    const followHandler = async () => {
        if(load) return
        setLoad(true)
        setFollowed(true)
        await dispatch(follow(auth, user, socket))
        setLoad(false)
    }

    const unfollowHandler = async () => {
        if(load) return
        setLoad(true)
        setFollowed(false)
        await dispatch(unfollow(auth, user, socket))
        setLoad(false)
    }
    return (
        <>
        {followed ? 
            <button className={`${styles.btn} ${styles.unfollow_btn}`} onClick={unfollowHandler} > Unfollow </button>
            :
            <button className={`${styles.btn} ${styles.follow_btn}`} onClick={followHandler} > Follow </button>}
        </>     
    )
}

export default FollowBtn
