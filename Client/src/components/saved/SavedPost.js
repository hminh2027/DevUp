import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import UserCard from '../util/UserCard'
import Card from '../util/Card'

import {BsBookmarkDash} from 'react-icons/bs'

import { unsavePost } from '../../store/actions/postAction'

import styles from './SavedPost.module.css'

const SavedPost = ({post}) => {
    const dispatch = useDispatch()

    const {auth} = useSelector(state => state)

    const unsaveHander = () => {
        dispatch(unsavePost(auth, post._id))
    }

    return (
            <Card width='100%' height='200px' bg='white' mg='1rem 0'>
                <div className={styles.container}>
                    <Link to={`/post/${post._id}`} className={styles.image_wrapper}>
                        {
                            post.media.length > 0 ? (post.media[0].url.match(/video/i)
                            ? <video className={styles.image} src={post.media[0].url} alt="video" />
                            : <img className={styles.image} src={post.media[0].url} alt="image" />)
                            : <img className={styles.image} src={post.user.avatar} className="image" alt='image' />
                        }
                    </Link>
                    <div className={styles.body}>
                        <div className={styles.title}>{post.body}</div>
                        <div className={styles.owner}>
                            <p style={{minWidth: 'fit-content'}}>Saved from</p> <UserCard height='2rem' avatar={post.user.avatar} username={post.user.username} />
                        </div>
                        <div onClick={unsaveHander} className={styles.icon_wrapper}>
                            <BsBookmarkDash className={styles.icon} />
                            <div className={styles.icon_text} >Unsave</div>
                        </div>
                    </div>
                </div>
            </Card>
    )
}

export default SavedPost
