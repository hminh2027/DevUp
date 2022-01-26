import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TextareaAutosize from 'react-textarea-autosize'
import { sharePost } from '../../store/actions/postAction'
import PostCard from '../post/PostCard'
import UserCard from '../util/UserCard'

import styles from './SharePostModal.module.css'

const ShareModal = ({post, setIsEdit}) => {
    const dispatch = useDispatch()
    const {auth, socket} = useSelector(state=>state)

    const [body, setBody] = useState('')

    const submitHandler = () => {
        dispatch(sharePost(auth, post, body, socket))
        closeModal()
    }

    const closeModal = () => {
        dispatch({type: 'MODAL', payload: false})
        setIsEdit(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.heading}>Sharing</div>
            <div className={styles.usercard}>
                <UserCard username={auth.user.username} avatar={auth.user.avatar} />
            </div>
            <div className={styles.body}>
                <div className={styles.input_wrapper}>
                    <TextareaAutosize minRows='3' maxRows='8' value={body} spellCheck='false' type='text' name='body' onChange={e=>setBody(e.target.value)} className={styles.textarea} placeholder="What's on your mind?" />
                </div>
                <div className={styles.share_content}>
                    <PostCard post={post} isShared={true} />
                </div>
            </div>
            <div onClick={submitHandler} className={styles.submit_btn}>Post</div>
        </div>
    )
}

export default ShareModal
