import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

import {GoPrimitiveDot} from 'react-icons/go'
import {CgMoreAlt} from 'react-icons/cg'

import TagIcon from '../../util/TagIcon'
import Avatar from '../../util/Avatar'
import NoticeOption from './NoticeOption'

import styles from './NoticeCard.module.css'
import moment from 'moment'
import { readNotice } from '../../../store/actions/noticeAction'
import { useDispatch, useSelector } from 'react-redux'


const NoticeCard = ({msg}) => {
    const ref = useRef()
    const dispatch = useDispatch()
    const {auth} = useSelector(state=>state)

    const noticeDropdown = document.getElementById('notice_dropdown')

    const [showOption, setShowOption] = useState(false)
    const [isExiting, setExiting] = useState(false)

    const readHandler = () => {
        !msg.isRead.includes(auth.user._id) && dispatch(readNotice(auth, msg))
    }

    return (
    <div style={{transform: `${isExiting&& 'translate(-150%,0)'}`}} className={styles.container}>
        <Link onClick={readHandler} to={`/${msg.type}/${msg.url}`} key={msg.url} replace>
            <div className={styles.notice_wrapper}>
                <div className={styles.avatar}>
                    <Avatar id={msg.id} src={msg.user.avatar} diameter='3.5rem'/>
                    <div className={styles.tag_icon_wrapper}><TagIcon tag={msg.tag} /></div>
                </div>
                <div className={styles.body}>
                    <div className={styles.text_noti}>
                        <b>{msg.user.username}</b> {msg.text}
                    </div>
                    <div style={{color: `${msg.isRead ? 'inherit' : '#1880bd'}`}} className={styles.time}>{moment(msg.createdAt).fromNow()}</div>
                </div>
                {!msg.isRead.includes(auth.user._id) && <div className={styles.dot}><GoPrimitiveDot /></div>}
            </div>
        </Link>
        <div ref={ref} onClick={()=>setShowOption(true)} style={{opacity: `${showOption ? '1' : '0'}`}} className={styles.notice_option}>
            <CgMoreAlt className={styles.icon}/>
        </div>
        {showOption && ReactDOM.createPortal(<NoticeOption top={ref.current && ref.current.getBoundingClientRect().y} msg={msg} setExiting={setExiting} setIsShow={setShowOption} isShow={showOption} />, noticeDropdown)}
    </div>
    )
}

export default NoticeCard
