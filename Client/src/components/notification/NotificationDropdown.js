import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import {CgMoreAlt} from 'react-icons/cg'
import {BsFillBellFill} from 'react-icons/bs'

import DropdownCard from '../util/DropdownCard'
import NoticeCard from './notices/NoticeCard'
import NotificationOption from './NotificationOption'
import { useMediaQuery } from 'react-responsive'

import { motion, AnimatePresence } from "framer-motion"

import Spinner from '../../assets/Spinner.png'
import styles from './NotificationDropdown.module.css'

const NotificationDropdown = ({isShow, setIsShow}) => {    
    const {notice} = useSelector(state=>state)
    const [showOption, setShowOption] = useState(false)

    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })

    return (
        <>
            <DropdownCard isShow={isShow} setIsShow={setIsShow} right='0' width={isDesktop ? '30%': '90%'} padding={isDesktop ? '1rem': ' 1rem 5%'}>
                <div className={styles.heading}>
                    <div className={styles.title}>Notification</div>
                    <div style={{opacity: `${showOption ? '1' : '.5'}`}} onClick={()=>setShowOption(true)} className={styles.heading_option}>
                        <CgMoreAlt className={styles.icon}/>
                        <NotificationOption  isShow={showOption} setIsShow={setShowOption}/>
                    </div>
                </div>
                <div className={styles.content}>
                <AnimatePresence >
                    {notice.loading ? 
                    <div className={styles.spinner_wrapper}><img src={Spinner} alt='spinner'/></div> 
                    : 
                    notice.data.length>0 ? notice.data.map((msg,index)=>(
                        <motion.div
                        key={index}
                        initial={{transform: 'translate(150%,0)', opacity: 0}}
                        animate={{transform: 'translate(0,0)', opacity: 1, transitionDuration: `.6s`, transitionDelay:`${(index+1)*0.2}s`}}
                        >
                            <NoticeCard msg={msg} />
                        </motion.div>
                    )) : 
                    <div className={styles.no_notice_wrapper}>
                        <div className={styles.icon_wrapper}><BsFillBellFill /></div>
                        No notifications available!
                    </div>                   
                    }
                </AnimatePresence>
                </div>
                <div style={{position: 'absolute', top: 0, width: '100%'}} id='notice_dropdown'></div>
            </DropdownCard>
        </>
    )
}

export default NotificationDropdown
