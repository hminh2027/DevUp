import React from 'react'
import { Link } from 'react-router-dom'

import {AiTwotoneHeart} from 'react-icons/ai'
import {BsFillChatDotsFill} from 'react-icons/bs'

import styles from './MediaCard.module.css'

const MediaCard = ({post}) => {
    return (
        <Link to={`/post/${post._id}`} >
            <div className={styles.container}>
                    {
                    post.media[0].url.match(/video/i)
                    ? 
                    <video className={styles.media} src={post.media[0].url} alt="video" />
                    :
                    <img className={styles.media} src={post.media[0].url} alt='media' />
                    }
                <div className={styles.count}>
                    <div className={styles.wrapper}>
                        <div className={styles.icon_wrapper}>
                            <AiTwotoneHeart/>
                        </div>
                        {post.likes.length}
                    </div>
                    <div className={styles.wrapper}>
                        <div className={styles.icon_wrapper}>
                            <BsFillChatDotsFill/>
                        </div>
                        {post.comments.length}
                    </div>
                </div>
                <div className={styles.black_bg}></div>
            </div>
        </Link>
    )
}

export default MediaCard
