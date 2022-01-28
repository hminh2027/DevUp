import React from 'react'

import styles from './MenuButton.module.css'

const MenuButton = ({showMenu, setShowMenu}) => {
    return (
        <div onClick={()=>setShowMenu(!showMenu)} className={styles.menu_btn}>
            <div className={styles.menu_icon}>
                <div style={showMenu ? {left: '-100%', opacity: 0} : {}} className={styles.line_1}></div>
                <div style={showMenu ? {transformOrigin: 'left', transform: 'rotateZ(45deg)'} : {}} className={styles.line_2}></div>
                <div style={showMenu ? {transformOrigin: 'left', transform: 'rotateZ(-45deg)'} : {}} className={styles.line_3}></div>
            </div>
        </div>
    )}

export default MenuButton
