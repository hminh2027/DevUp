import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import PostCard from '../../post/PostCard'
import GridGallery from '../../util/GridGallery'
import InfiniteList from '../../util/InfiniteList'
import MediaCard from './MediaCard'

import {IoInformation} from 'react-icons/io5'
import {IoMdGrid} from 'react-icons/io'
import {GoFileMedia} from 'react-icons/go'
import {FaUser} from 'react-icons/fa'
import {GiPhone} from 'react-icons/gi'
import {HiHome} from 'react-icons/hi'

import Spinner from '../../../assets/Spinner.png'

import styles from './Tabs.module.css'

const Tabs = ({profile}) => {
    const tabs = [
        {icon: <IoMdGrid/>, label:'post'},
        {icon: <IoInformation/>, label:'about'},
        {icon: <GoFileMedia/>, label:'media'}
    ]

    const {post} = useSelector(state=> state)

    const [media, setMedia] = useState([])
    const [activeTab, setActiveTab] = useState(0)

    useEffect(() => {
        let media = []
        post.posts.map(e => {
            if(e.media.length > 0){
                media.push(<MediaCard post={e} />)
            }
        })
        
        setMedia(media)

    }, [post.posts])

    return(
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
    )}

export default Tabs
