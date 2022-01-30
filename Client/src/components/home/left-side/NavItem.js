import React from 'react'
import styles from './NavItem.module.css'

export default function NavItem({text, icon, active}) {
    return (
        <div className={`${styles.nav_item} ${active ? styles.active : ''}`} >
            <div className={styles.icon_wrapper}>{icon}</div>
            <div className={styles.text}>{text}</div>
        </div>
    )
}