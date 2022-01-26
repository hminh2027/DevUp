import React from 'react'
import styles from './UserCard.module.css'

const UserCard = (props) => {
    return (
        <div className={styles.card}>
            <img style={{height: `${props.height}`}} className={styles.image} src={props.avatar} alt="avatar" />
            <div className={styles.text_wrapper}>
                <div style={{color: `${props.color ? props.color : 'black'}`}} className={styles.text}>
                    {props.username}
                </div>
            </div>
        </div>
    )
}

export default UserCard
