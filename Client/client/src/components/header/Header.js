import React from 'react'
import {useState, useEffect} from 'react'
import { useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import {AiOutlineSetting} from 'react-icons/ai'
import {IoSearch} from 'react-icons/io5'

import NotificationDropdown from '../notification/NotificationDropdown'
import SettingOption from './SettingOption'
import { motion, AnimatePresence } from "framer-motion"
import SearchResult from './SearchResult'
import Avatar from '../util/Avatar'
import OutsideClick from '../util/OutsideClick'
import ResponsiveMenu from './ResponsiveMenu'
import Logo from '../../assets/logo.png'

import styles from './Header.module.css'
import MenuButton from './MenuButton'


function Header() {
    const [showNoti, setShowNoti] = useState(false)
    const [showSetting, setShowSetting] = useState(false)
    
    // responsive part
    const [showSearch, setShowSearch] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    const [notiLength, setNotiLength] = useState()

    const {auth, notice} = useSelector(state=>state)

    useEffect(()=>{
        const readNotices = notice.data.filter(noti=>noti.isRead.every(id=>id!=auth.user._id))
        setNotiLength(readNotices.length)

    },[notice])

    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <Link to='/' >
                    <img className={styles.logo} src={Logo} alt='logo'/>
                </Link>
                {isDesktop && <div className={styles.search}>
                    <SearchResult/>
                </div>}
                <div className={styles.btn_group_wrapper}>
                    <div className={styles.btn_group}>
                        {isDesktop ?
                        <div onClick={()=>setShowSetting(!showSetting)} className={styles.setting_btn}>
                            <motion.div 
                            whileHover={{rotate: 90, scale: 1.1}} 
                            style={{display: 'flex', borderRadius: '50%'}}        
                            >                    
                                <AiOutlineSetting />
                            </motion.div>
                        </div>
                        :
                        <div onClick={()=>setShowSearch(!showSearch)} className={styles.search_btn}>
                            <IoSearch/>
                        </div>}
                        
                        <div style={isDesktop ? {width: '2.2rem', height: '2.2rem', margin: '1.5rem'}:{}} onClick={()=>setShowNoti(!showNoti)} className={styles.noti_btn}>
                            {notiLength}
                        </div>

                        {isDesktop ?
                        <Link to={`/profile/${auth.user._id}`} className={styles.avatar_wrapper}>
                            <div className={styles.name}>{auth.user.username}</div>
                            <Avatar id={auth.user._id} src={auth.user.avatar} diameter='3.5rem' />
                        </Link>
                        :
                        <MenuButton showMenu={showMenu} setShowMenu={setShowMenu} />}
                    </div>
                </div>
            </div>
            <AnimatePresence >
                {showMenu &&
                <motion.div 
                key='menu'
                initial={{transform: showMenu ? 'translate(100%,0)' : 'translate(0,0)'}}
                animate={{transform: showMenu ? 'translate(0,0)' : 'translate(100%,0)', transitionDuration: `.2s`}}
                exit={{transform: showMenu ? 'translate(100%,0)' : 'translate(0,0)', transitionDuration: '.2s'}}
                >
                    <OutsideClick state={showMenu} setState={setShowMenu}>
                        <ResponsiveMenu/>
                    </OutsideClick>
                </motion.div>}

                {showSearch &&
                <motion.div
                key='search'
                initial={{transform: 'translate(0,-100%)'}}
                animate={{transform: 'translate(0,0)', transitionDuration: `.2s`}}
                exit={{transform: 'translate(0,-100%)'}}
                className={styles.search_dropdown}
                >
                    <OutsideClick state={showSearch} setState={setShowSearch}>
                        <SearchResult/>
                    </OutsideClick>    
                </motion.div>}

                {showNoti &&
                <motion.div
                key='notification'
                className={styles.noti_dropdown}
                >
                    <NotificationDropdown isShow={showNoti} setIsShow={setShowNoti}/>
                </motion.div>}

                <div className={styles.setting_dropdown} >
                    <SettingOption isShow={showSetting}  setIsShow={setShowSetting}/>
                </div>
            </AnimatePresence>
        </div>
    )
}

export default Header
