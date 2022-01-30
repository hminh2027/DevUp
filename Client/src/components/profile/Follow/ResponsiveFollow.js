import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useMediaQuery } from 'react-responsive'

import { motion, AnimatePresence } from "framer-motion"

import Modal from '../../util/Modal'
import FollowModal from '../../modal/FollowModal'
import FriendCard from '../Tab/FriendCard'
import GridGallery from '../../util/GridGallery'

import styles from './ResponsiveFollow.module.css'

const ResponsiveFollow = ({profile}) => {
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })
    const portal = document.getElementById('portal')

    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [isFollower, setIsFollower] = useState(true)
    const [showFollow, setShowFollow] = useState(false)

    useEffect(() => {
        if(profile.loading || Object.keys(profile.user).length === 0) return
        let tempFollowers =  profile.user.followers.slice(0, 6)
        let tempFollowing =  profile.user.following.slice(0, 6)

        let output = []

        tempFollowers.map(e=>{
            output.push(<FriendCard user={e} />)
        })

        setFollowers(output)
        output = []

        tempFollowing.map(e=>{
            output.push(<FriendCard user={e} />)
        })

        setFollowing(output)

    }, [profile])

    return (
    <>
        {showFollow && ReactDOM.createPortal(
            <Modal setIsEdit={setShowFollow} width='100%' height='100%' >
                <FollowModal title={isFollower ? 'Followers':'Following'} list={isFollower ? profile.user.followers : profile.user.following} />
            </Modal>
        , portal)}

        {!isDesktop &&
            <div className={styles.follow}>
                <div className={styles.heading}>
                    <div className={styles.title_wrapper}>
                        <div className={styles.title}>{isFollower ? 'Followers' : 'Following'}</div>
                        <div className={styles.count}>{!profile.loading && Object.keys(profile.user).length !== 0 && (isFollower ?  profile.user.followers.length : profile.user.following.length)}</div>
                    </div>
                    <button onClick={()=>setIsFollower(!isFollower)} className={styles.btn}>{isFollower ? 'Show following' : 'Show followers'}</button>
                </div>
                <div className={styles.body}>
                <AnimatePresence>
                    {isFollower ? 
                    <motion.div
                    key='followers'
                    initial={{transform: 'translate(-100%,0)'}}
                    animate={{transform: 'translate(0%,0)'}}
                    className={styles.follower}>
                        {!profile.loading && Object.keys(profile.user).length !== 0 && <GridGallery length='3' list={followers} />}
                    </motion.div>
                    :
                    <motion.div
                    key='following'
                    initial={{transform: 'translate(100%,0)'}}
                    animate={{transform: 'translate(0%,0)'}}
                    className={styles.following}>
                        {!profile.loading && Object.keys(profile.user).length !== 0 && <GridGallery length='3' list={following} />}
                    </motion.div>
                    }
                </AnimatePresence>
                </div>
                <div className={styles.footer}>
                    <button onClick={()=>setShowFollow(true)} className={styles.show_btn}>Show all</button>
                </div>
                
            </div>}
    </>
)}

export default ResponsiveFollow
