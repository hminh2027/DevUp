import React from 'react'
import LeftSideBar from '../../components/message/LeftSideBar'
import styles from './Message.module.css'

const Message = () => {
    return (
        <>
            <LeftSideBar />
            <div className={styles.middle_bar}>

            </div>
            <div className={styles.right_bar}>
                <div className={styles.information}></div>
                <div className={styles.media}></div>
                <div className={styles.task}></div>
            </div>
        </>
    )
}

export default Message
