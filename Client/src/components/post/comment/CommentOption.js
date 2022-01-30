import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DropdownCard from '../../../components/util/DropdownCard'
import { deleteComment } from '../../../store/actions/commentAction'

import styles from './CommentOption.module.css'

const CommentOption = ({setIsEdit, post, comment, isShow, setIsShow}) => {
    const dispatch = useDispatch()
    const {auth, socket} = useSelector(state=>state)

    const deleteHandler = () => {
        dispatch(deleteComment(auth, comment, post, socket))
    }

    return (
        <DropdownCard isShow={isShow} setIsShow={setIsShow} right='-100%' top='100%'>
            {auth.user._id===comment.user._id && 
            <div className={styles.option_item} onClick={()=>setIsEdit(true)} >
                Edit
            </div>
            }         
            <div className={styles.option_item} onClick={deleteHandler} >
                Delete
            </div>
        </DropdownCard>       
    )
}

export default CommentOption
