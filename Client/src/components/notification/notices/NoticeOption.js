import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {RiDeleteBinLine} from 'react-icons/ri'
import {GoCheck} from 'react-icons/go'

import DropdownCard from '../../util/DropdownCard'
import { deleteNotice, readNotice, unreadNotice } from '../../../store/actions/noticeAction'

import styles from './NoticeOption.module.css'

const NoticeOption = ({setIsShow, isShow, msg, setExiting, top}) => {
    const dispatch = useDispatch()
    const {auth} = useSelector(state=>state)

    const markHandler = () => {
        msg.isRead.includes(auth.user._id) ? dispatch(unreadNotice(auth, msg)) : dispatch(readNotice(auth, msg))
    }

    const deleteHandler = () => {
        setExiting(true)
        dispatch(deleteNotice(auth, msg._id))
    }
    
    return (
        <DropdownCard setIsShow={setIsShow} isShow={isShow} right='25%' top={top-150} >
            <div onClick={markHandler} className={styles.option_item}  >
                <GoCheck className={styles.icon}/>
                <div className={styles.text}>{msg.isRead.includes(auth.user._id) ? `Mark unread` : `Mark read`}</div>
            </div>      
            <div onClick={deleteHandler} className={styles.option_item} >
                <RiDeleteBinLine className={styles.icon}/>
                <div className={styles.text}>Delete</div>
            </div>
        </DropdownCard>
    )
}

export default NoticeOption
