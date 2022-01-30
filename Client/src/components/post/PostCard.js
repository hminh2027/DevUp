import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

import {CgMoreAlt} from 'react-icons/cg'

import ReactBar from './ReactBar'
import { updatePost } from '../../store/actions/postAction'
import PostOption from './PostOption'
import PostCounter from './PostCounter'
import Comment from './comment/Comment'
import PostContent from './PostContent'
import InputComment from './comment/InputComment'
import Card from '../../components/util/Card'

import TextareaAutosize from 'react-textarea-autosize'
import moment from 'moment'
import styles from './PostCard.module.css'
import Avatar from '../util/Avatar'



const PostCard = ({post, isShared}) => {
    const dispatch = useDispatch()

    const [isComment, setIsComment] = useState(false)
    const [isEdit,setIsEdit] = useState(false)
    const [showOption, setShowOption] = useState(false)
    const [body,setBody] = useState()

    const {auth} = useSelector(state=>state)

    useEffect(() => {
        setBody(post.body)
    }, [post.body, isEdit])

    const bodyChangeHandler = e => {
        setBody(e.target.value)
    }

    const submitHandler = e => {
        e.preventDefault()
        dispatch(updatePost(body, auth, post._id))
        setIsEdit(false)
    }

    return (
        <Card width='100%' bg='white' mg='0 0 4rem 0'>
            <div className={styles.content}>
                <div className={styles.heading}>
                    <div className={styles.avatar}>
                        <Avatar src={post.user.avatar} id={post.user._id} diameter='3rem' />
                    </div>
                    <div className={styles.name}>
                        <Link to={`/profile/${post.user._id}`}>
                            {post.user.username}
                        </Link>
                    </div>
                    <div className={styles.time}>{moment(post.createdAt).fromNow()}</div>
                </div>

                {isEdit ?
                <TextareaAutosize maxRows={8} spellCheck={false} type="text" name="body" className={styles.textarea} onChange={bodyChangeHandler} value={body} />
                : 
                <div className={styles.text}>{post.body}</div>
                }

                {isEdit &&
                <div className={styles.btn_group}>
                    <div onClick={()=>setIsEdit(false)} className={`${styles.cancel_btn} ${styles.button}`}>Cancel</div>
                    <div onClick={submitHandler} className={`${styles.submit_btn} ${styles.button}`}>Submit</div> 
                </div>
                }

                {post.shareContent ? <PostCard post={post.shareContent} isShared={true} /> : <PostContent post={post} />}
            </div>
            {!isShared && 
            (<div>
                <div style={{opacity: `${showOption ? '1' : '.5'}`}} onClick={()=>setShowOption(!showOption)} className={styles.option_btn}>
                    <CgMoreAlt />
                    <PostOption setIsShow={setShowOption} isShow={showOption} post={post} setIsEdit={setIsEdit} />
                </div>
                <PostCounter post={post} />
                <ReactBar isComment={isComment} setIsComment={setIsComment} post={post} /> 
                <div className={styles.bottom_wrapper}>
                    <Comment post={post} />
                    {isComment && <InputComment post={post} />}
                </div> 
            </div>)}
        </Card>
    )
}

export default PostCard
