import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { deleteNotices, getNotices, readNotices } from '../../store/actions/noticeAction'

import DropdownCard from '../util/DropdownCard'

import {RiDeleteBinLine} from 'react-icons/ri'
import {GoCheck} from 'react-icons/go'

import styles from './NotificationOption.module.css'

const NotificationOption = ({isShow, setIsShow}) => {
    const dispatch = useDispatch()
    const {auth} = useSelector(state=>state)

    const deleteHandler = () => {
        dispatch(deleteNotices(auth))
    }

    const readHandler = async () => {
        await dispatch(readNotices(auth))
        await dispatch(getNotices(auth))
    }

    return (
        <DropdownCard top='0%' right='100%' setIsShow={setIsShow} isShow={isShow} >
            <div onClick={readHandler} className={styles.option_item}  >
                <GoCheck className={styles.icon}/>
                <div className={styles.text}>Mark read all</div>
            </div>      
            <div className={styles.option_item} >
                <RiDeleteBinLine className={styles.icon}/>
                <div onClick={deleteHandler} className={styles.text}>Delete all</div>
            </div>
        </DropdownCard>
    )
}

export default NotificationOption
