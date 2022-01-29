import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

import NavItem from './NavItem'
import {MdPeopleOutline, MdChatBubbleOutline, MdMailOutline} from 'react-icons/md'
import {IoBookmarkOutline} from 'react-icons/io5'
import {RiSuitcaseLine} from 'react-icons/ri'

import styles from './NavList.module.css'

export default function NavList() {
    const items = [
        {text: 'Posts', icon: <MdChatBubbleOutline className={styles.icon} />, path: '/'},
        {text: 'People', icon: <MdPeopleOutline className={styles.icon} />, path: '/people'},
        {text: 'Saved', icon: <IoBookmarkOutline className={styles.icon} />, path: '/saved'},
        {text: 'Inbox', icon: <MdMailOutline className={styles.icon} />, path: '/message'},
        {text: 'Code', icon: <RiSuitcaseLine className={styles.icon} />, path: '/project'}
    ]

     const [activeIndex, setActiveIndex] = useState()

    useEffect(()=>{
        const curPath = window.location.pathname.split('/')[1]
        const activeItem = items.findIndex(i=>i.path.split('/')[1] == curPath)
        setActiveIndex(curPath.length === 0 ? 0 : activeItem)

    },[window.location.pathname])

    return (
        <div className={styles.nav_list}>
            {items.map((e, index)=>(
                <Link key={index} to={e.path} >
                    <NavItem active={activeIndex == index} text={e.text} icon={e.icon} />
                </Link>
            ))}
        </div>
    )
}
