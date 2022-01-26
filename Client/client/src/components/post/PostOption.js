import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { deletePost, savePost, unsavePost } from '../../store/actions/postAction'

import {BsBookmarkPlus, BsBookmarkDash} from 'react-icons/bs'
import {RiDeleteBinLine, RiEditLine} from 'react-icons/ri'

import DropdownCard from '../util/DropdownCard'

import styles from './PostOption.module.css'

const PostOption = ({setIsEdit, post, isShow, setIsShow}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const {auth} = useSelector(state=>state)

    const [isMe, setIsMe] = useState(false)
    const [isSaved, setIsSaved] = useState(false)

    useEffect(()=>{
        if(auth.user._id === post.user._id) setIsMe(true)
        else setIsMe(false)

    },[auth.user._id, post.user._id])

    useEffect(() => {
        if(auth.user.saved.find(p=>p._id == post._id)) setIsSaved(true)
        else setIsSaved(false)

    }, [auth.user.saved])

    const deleteHander = () => {
        dispatch(deletePost(auth, post._id))
        history.replace('/')
    }

    const saveHander = () => {
        isSaved ? dispatch(unsavePost(auth, post._id)) : dispatch(savePost(auth, post._id))
    }

    return (
        <DropdownCard isShow={isShow} setIsShow={setIsShow}>
            <div className={styles.option_item} onClick={saveHander} >
                {isSaved ? <BsBookmarkDash className={styles.icon}/> : <BsBookmarkPlus className={styles.icon}/>}
                <div className={styles.text}>{isSaved ? 'Unsave' : 'Save'}</div>
            </div>
            {isMe && 
            <div className={styles.option_item} onClick={()=>setIsEdit(true)}>
                <RiEditLine className={styles.icon}/>
                <div className={styles.text}>Edit</div>
            </div>
            }
            {isMe && 
            <div className={styles.option_item} onClick={deleteHander} >
                <RiDeleteBinLine className={styles.icon}/>
                <div className={styles.text}>Delete</div>
            </div>
            } 
        </DropdownCard>       
    )
}

export default PostOption
