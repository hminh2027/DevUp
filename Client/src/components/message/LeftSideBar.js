import React from 'react'

import {AiOutlineSearch} from 'react-icons/ai';

import styles from './LeftSideBar.module.css'

const LeftSideBar = () => {
    return (
        <div className={styles.left_bar}>
            <div className={styles.container}>
                <div className={styles.heading}>
                    <div className={styles.title}>Messages</div>
                    <div className={styles.notification_count}>3</div>
                </div>
                <div className={styles.search}>
                    <AiOutlineSearch/>
                    <input className={styles.input} type='text' />
                </div>
                <div className={styles.message_list}>

                </div>
                <div className={styles.create_btn}>+</div>
            </div>
        </div>
    )
}

export default LeftSideBar
