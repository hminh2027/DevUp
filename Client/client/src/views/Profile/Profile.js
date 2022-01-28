import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { getUser } from '../../store/actions/profileAction'
import { useMediaQuery } from 'react-responsive'

import Header from '../../components/header/Header'
import FollowBtn from '../../components/profile/FollowBtn'
import EditBtn from '../../components/profile/EditBtn'
import FollowBar from '../../components/profile/FollowBar'
import ResponsiveFollow from '../../components/profile/Follow/ResponsiveFollow'
import Tabs from '../../components/profile/Tab/Tabs'
import Avatar from '../../components/util/Avatar'

import styles from './Profile.module.css'


const Profile = () => {   
    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(() => {
        dispatch({type:'GET_USER', payload: {}})
        dispatch({type:'GET_POSTS', payload: []})
        
    }, [id])

    const {auth, profile} = useSelector(state=> state)

    const [isMe, setIsMe] = useState(false)

    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })

    useEffect(() => {
        dispatch(getUser(auth, id))

    },[auth.user._id, dispatch, id])

    useEffect(() => {
        if(profile.user._id === auth.user._id) setIsMe(true)
        else setIsMe(false)

    }, [auth.user._id, profile.user._id])

    return (
        <>        
            <Header/>
            <div className={styles.profile_wrapper}>
                {isDesktop && <div className={styles.leftside}>
                    {!profile.loading && <FollowBar profile={profile} />}
                </div>}

                <div id='inf_user_posts' className={styles.container}>
                    <div className={styles.profile}>
                        <div style={{backgroundImage: `url('${profile.user.background}')`}} className={styles.background}></div>

                        {/* Information */}
                        <div className={styles.information}>
                            <div className={styles.avatar_wrapper}>
                                <div className={styles.avatar}>
                                    <Avatar src={profile.user.avatar} id={profile.user._id} diameter='15rem' />
                                </div>
                            </div>
                            <div className={styles.introduce}>
                                <div className={styles.name}>{!profile.loading && profile.user.username} </div>
                                <div className={styles.bios}>{!profile.loading && profile.user.bio} </div>
                            </div>
                            {isMe ? <EditBtn/> : (!profile.loading && <FollowBtn user={profile.user} />)}                      
                        </div>

                        {/* Responsive Follow */}
                        <ResponsiveFollow profile={profile} />

                        {/* Tabs */}
                        <Tabs profile={profile} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
