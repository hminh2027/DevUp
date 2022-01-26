import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import {getPosts} from '../../store/actions/postAction'

import NavList from '../../components/home/left-side/NavList'
import Header from '../../components/header/Header'
import Status from '../../components/home/Status'
import InfiniteList from '../../components/util/InfiniteList'
import PostCard from '../../components/post/PostCard'
import Advertising from '../../components/home/right-side/Advertising'
import FriendSuggestion from '../../components/home/right-side/FriendSuggestion'

import Spinner from '../../assets/Spinner.png'
import styles from './Home.module.css'
import ResponsiveFriendSuggestion from '../../components/home/right-side/ResponsiveFriendSuggestion'


export default function Home() {
    const dispatch = useDispatch()
    const {auth, post} = useSelector(state=>state)

    const [showSuggestion, setShowSuggestion] = useState(true)

    useEffect(()=>{
        dispatch(getPosts(auth))
    },[auth.user._id])

    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })
    // const isTablet = useMediaQuery({ query: '(min-device-width : 768px) and (max-device-width: 1224px)' })
    // const isMobile = useMediaQuery({ query: '(max-device-width : 480px)'})

    return (
        <>
            <Header/>
            <div className={styles.content}>
                <div className={styles.container}>
                    {isDesktop && <div className={styles.leftside}>
                        <NavList/>
                    </div> }
                    <div id='inf_posts' className={styles.middle}>
                        <Status/>
                        {!isDesktop && (showSuggestion && <ResponsiveFriendSuggestion setShowSuggestion={setShowSuggestion} />)}
                        {post.loading?
                        <div className={styles.spinner_wrapper}>
                            <img src={Spinner} alt='spinner' />
                        </div>                      
                        :
                        <InfiniteList id={false} action='GET_MORE_POSTS' api='post' list={post.posts} elem='inf_posts' >
                            {post.posts.length > 0 ? post.posts.map(post=>(
                                <PostCard key={post._id} post={post} />
                            ))
                            :
                            <div className={styles.no_post}>No post available!</div>}
                        </InfiniteList>
                        }                       
                    </div>
                    {isDesktop && <div className={styles.rightside}>
                        <Advertising/>
                        <FriendSuggestion/>        
                    </div>}
                </div>
            </div>
        </>
    )
}
