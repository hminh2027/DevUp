import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link  } from 'react-router-dom'

import {GrFormClose} from 'react-icons/gr'

import { readNotice } from '../../store/actions/noticeAction'

import TagIcon from '../util/TagIcon'

import styles from './NotificationDisplay.module.css'
import moment from 'moment'
import Avatar from '../util/Avatar'

const NotificationDisplay = () => {
    const ref = useRef()
    const dispatch = useDispatch()

    const {notice, auth} = useSelector(state=>state)
    const [isShow, setIsShow] = useState(false)
    const [msg, setMsg] = useState({})

    useEffect(()=>{
        if(!notice.popup) return
        setIsShow(true)
        setMsg(notice.data[0])

    },[notice.popup])

    useEffect(()=>{
        isShow && setTimeout(() => {
            closeHandler()
        }, 5000)
    },[isShow])

    const readHandler = () => {
        dispatch(readNotice(auth, msg))
    }

    const closeHandler = () => {
        ref.current.style.left = '-20%'
        setTimeout(() => {
            dispatch({type:'SHOW_NOTICE', payload: false})
            setIsShow(false)
        }, 300)
    }

    return (
        <>
            {isShow && 
            <div ref={ref} className={styles.notice_wrapper}>
                <div className={styles.container}>
                    <div className={styles.heading}>
                        <div className={styles.title}>New Notification</div>
                        <div onClick={closeHandler} className={styles.icon_wrapper}><GrFormClose className={styles.icon} /></div>
                    </div>
                    <Link onClick={readHandler} to={`/post/${msg.url}`} replace>
                        <div className={styles.content}>
                            <div className={styles.avatar}>
                                <Avatar id={msg.id} src={msg.user.avatar} diameter='4rem' />
                                <div className={styles.tag_icon_wrapper}>
                                    <TagIcon tag={msg.tag} />
                                </div>
                            </div>
                            <div className={styles.body}>
                                <div className={styles.text_noti}>
                                <b>{msg.user.username}</b>&nbsp;{msg.text}
                                </div>
                                <div className={styles.time}>{moment(msg.createdAt).fromNow()}</div>
                            </div>
                        </div>                        
                    </Link>
                </div>
            </div>
            }
        </>
    )
}

export default NotificationDisplay
