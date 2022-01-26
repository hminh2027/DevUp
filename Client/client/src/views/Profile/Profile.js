import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { getUser } from '../../store/actions/profileAction'
import { useMediaQuery } from 'react-responsive'

import Header from '../../components/header/Header'
import FollowBtn from '../../components/profile/FollowBtn'
import EditBtn from '../../components/profile/EditBtn'
import FollowBar from '../../components/profile/FollowBar'
import InfiniteList from '../../components/util/InfiniteList'
import PostCard from '../../components/post/PostCard'

import {IoInformation} from 'react-icons/io5'
import {IoMdGrid} from 'react-icons/io'
import {GoFileMedia} from 'react-icons/go'
import {FaUser} from 'react-icons/fa'
import {GiPhone} from 'react-icons/gi'
import {HiHome} from 'react-icons/hi'

import Avatar from '../../components/util/Avatar'
import Spinner from '../../assets/Spinner.png'

import styles from './Profile.module.css'
import GridGallery from '../../components/util/GridGallery'
import MediaCard from '../../components/profile/Tab/MediaCard'
import ResponsiveFollow from '../../components/profile/Follow/ResponsiveFollow'

const Profile = () => {   
    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(() => {
        dispatch({type:'GET_USER', payload: {}})
        dispatch({type:'GET_POSTS', payload: []})
        
    }, [id])

    const {auth, profile, post} = useSelector(state=> state)

    const [isMe, setIsMe] = useState(false)
    const [media, setMedia] = useState([])
    const [activeTab, setActiveTab] = useState(0)

    useEffect(() => {
        dispatch(getUser(auth, id))

    },[auth.user._id, dispatch, id])

    useEffect(() => {
        let media = []
        post.posts.map(e => {
            if(e.media.length > 0){
                media.push(<MediaCard post={e} />)
            }
        })
        
        setMedia(media)

    }, [post.posts])

    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })

    useEffect(() => {
        if(profile.user._id === auth.user._id) setIsMe(true)
        else setIsMe(false)

    }, [auth.user._id, profile.user._id])

    const tabs = [
        {icon: <IoMdGrid/>, label:'post'},
        {icon: <IoInformation/>, label:'about'},
        {icon: <GoFileMedia/>, label:'media'}
    ]

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
                        <div className={styles.tabs_wrapper}>
                            <div className={styles.tabs}>
                                {tabs.map((tab, index) => (
                                    <div style={activeTab==index ? {borderTop:'1px solid #262626', margin: '-1px 2rem 0'} : {}} onClick={()=>setActiveTab(index)} key={index} className={styles.tab}>
                                        <div className={styles.icon_wrapper}>{tab.icon}</div>
                                        <div className={styles.text}>{tab.label}</div>
                                    </div>)
                                )}
                            </div>
                            {activeTab == 0 && 
                                (profile.loading ? 
                                <div className={styles.spinner_wrapper}><img src={Spinner} alt='spinner' /></div>
                                : 
                                <InfiniteList action='GET_MORE_POSTS' api='post/user_posts' list={post.posts} elem='inf_user_posts' id={profile.user._id}>
                                    {post.posts.length > 0 
                                    ? 
                                    post.posts.map(e=>(
                                        <PostCard key={e._id} post={e} />
                                    ))
                                    :
                                    <div className={styles.null}>No post available!</div>}
                                </InfiniteList>)}
                            {activeTab == 1 &&
                                <div className={styles.tab_content}>
                                    <div className={styles.details}><FaUser/> Gender: {profile.user.gender}</div>
                                    <div className={styles.details}><GiPhone/> Tel: {profile.user.tel}</div>
                                    <div className={styles.details}><HiHome/> Address: {profile.user.address}</div>                                
                                </div>
                            }
                            {activeTab == 2 &&
                                <div className={styles.tab_content}>
                                    {media.length > 0 
                                    ? 
                                    <GridGallery length='3' list={media} />
                                    :
                                    <div className={styles.null}>No media available!</div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
