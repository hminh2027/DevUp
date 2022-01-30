import React, {useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'

import Avatar from '../../util/Avatar'
import TextareaAutosize from 'react-textarea-autosize'
import {createComment} from '../../../store/actions/commentAction'

import styles from './InputComment.module.css'

const InputComment = ({onReply, post}) => {
    const dispatch = useDispatch()

    const [body, setBody] = useState('')
    const [onSubmit, setOnSubmit] = useState(false)
    const {auth, socket} = useSelector(state=>state)

    useEffect(()=>{
        if(onSubmit) submitHandler()
    },[onSubmit])

    useEffect(()=>{
        if(onReply) setBody(onReply.user.username)
    },[onReply])

    const submitHandler = () => {
        const trimBody = body.trim()
        if(trimBody=='') return
        const newComment = {
            body: trimBody,
            createdAt: new Date().toISOString(),
            reply: onReply && (onReply.reply ? onReply.reply : onReply._id),
            tag: onReply && onReply.user
        }
        dispatch(createComment(auth, newComment, post, socket))
        setBody('')
        setOnSubmit(false)
    }

    const inputHandler = (e) => {
        if(e.charCode == 13) {
            e.preventDefault()
            setOnSubmit(true)
        }
    }
    
    return (
        <form onSubmit={submitHandler} className={styles.container}>
            <Avatar diameter={onReply ? '2rem' : '2.5rem'} id={auth.user._id} src={auth.user.avatar} />
            <div className={styles.input_wrapper}>
                <TextareaAutosize value={body} onKeyPress={inputHandler} spellCheck='false' onChange={e=>setBody(e.target.value)} className={styles.input} placeholder='Write your comment here...' />
            </div>
        </form>
    )
}

export default InputComment
