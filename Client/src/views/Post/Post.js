import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";

import PostCard from '../../components/post/PostCard';
import Header from '../../components/header/Header'

import { getPost } from '../../store/actions/postAction';

import Spinner from '../../assets/Spinner.png'

import styles  from './Post.module.css'

const Post = () => {
    const history = useHistory()
    const {id} = useParams()
    const {auth, post} = useSelector(state=>state)
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getPost(auth, id))

    },[auth.user.id, id, dispatch])

    useEffect(()=>{
        !post.post && history.push('/pagenotfound')

    },[post.post])

    return (
        <>
            <Header/>
            <div className={styles.container}>
                {post.loading ? 
                <div className={styles.spinner_wrapper}><img src={Spinner} alt='spinner' /></div>
                : 
                <div className={styles.post_wrapper}>
                    {(post.post && Object.keys(post.post).length!==0 && <PostCard post={post.post} />)
                }
                </div>   
                }
                          
            </div> 
        </>
    )
}

export default Post
