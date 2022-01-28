import React from 'react'
import styles from './NavItem.module.css'

export default function NavItem(props) {
    return (
        <div className={`${styles.nav_item} ${props.active ? styles.active : ''}`} >
            <div className={styles.icon_wrapper}>
                {props.children}
            </div>
            <div className={styles.text}>{props.text}</div>
        </div>
    )
}
