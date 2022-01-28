import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import { updateComment } from '../../../store/actions/commentAction'

import CommentOption from './CommentOption'

import {CgMoreAlt} from 'react-icons/cg'
import {GoReply} from 'react-icons/go'

import moment from 'moment'
import Avatar from '../../util/Avatar'
import TextareaAutosize from 'react-textarea-autosize'

import styles from './CommentCard.module.css'

const CommentCard = ({post, comment, setOnReply}) => {
    const dispatch = useDispatch()

    const [showOption, setShowOption] = useState(false)
    const [body, setBody] = useState('')
    const [showMore, setShowMore] = useState(false)
    const [isLong, setIsLong] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [onSubmit, setOnSubmit] = useState(false)

    const {auth} = useSelector(state=>state)


    useEffect(()=>{
        if(onSubmit) submitHandler()
    },[onSubmit])
    
    useEffect(()=>{
        setBody(comment.body)
        setOnReply(false)

    },[comment.body, isEdit])

    useEffect(()=> {
        if(body && body.length > 250) {
            setIsLong(true)
            setShowMore(true)
        }
        else setIsLong(false)
        
    },[body])

    const submitHandler = () => {
        const trimBody = body.trim()
        if(trimBody=='') return setOnSubmit(false)
        dispatch(updateComment(auth, trimBody, post, comment))
        setIsEdit(false)
        setOnSubmit(false)
    }

    const checkHandler = (e) => {
        if(e.charCode == 13) {
            e.preventDefault()
            setOnSubmit(true)
        }
    }

    const replyHandler = () => {
        setOnReply(comment)
    }

    return (
        <div className={styles.cmt_wrapper}>
            <div className={styles.avatar}>
                <Avatar id={comment.user._id} src={comment.user.avatar} diameter={comment.reply ? '2rem' :'2.5rem'} />
            </div>
            <div className={styles.content_wrapper}>
                <div style={{width: `${isEdit? 'auto' : 'fit-content'}`}} className={styles.content}>
                    <div className={styles.name}>
                        <Link to={`/profile/${comment.user._id}`} >
                            {comment.user.username}
                        </Link>
                    </div>
                    <div className={styles.text}>
                        {isEdit ? 
                        <TextareaAutosize value={body} className={styles.input} onKeyPress={checkHandler} spellCheck='false' onChange={e=>setBody(e.target.value)} placeholder='Write your comment here...' />
                        : 
                        isLong && showMore ?
                        `${body.slice(0,250)}... ` : 
                        body.trim()
                        }
                        {isLong && (showMore ? 
                        <label onClick={()=>setShowMore(false)} className={styles.toggle_text}>[show more]</label> : 
                        <label onClick={()=>setShowMore(true)} className={styles.toggle_text}>[hidden]</label>
                        )}
                        {isEdit && <div onClick={()=>setIsEdit(false)} className={styles.cancel}>Cancel</div>}
                    </div>
                    {(auth.user._id === post.user._id || auth.user._id ===  comment.user._id) && 
                    <div style={{opacity: `${showOption ? '1' : '.3'}`}} onClick={()=>setShowOption(!showOption)} className={styles.option_btn}>
                        <CgMoreAlt/>
                        <CommentOption setIsEdit={setIsEdit} comment={comment} post={post} isShow={showOption} setIsShow={setShowOption} />
                    </div>
                    }
                    {!isEdit && <div onClick={replyHandler} className={styles.reply}><GoReply className={styles.icon} /></div>}
                </div>
            </div>           
            <div className={styles.time}>{moment(comment.createdAt).fromNow().replace(/(ago)+/g , '')}</div>
        </div>
    )
}

export default CommentCard
