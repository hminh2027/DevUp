import React from 'react'
import {Link} from 'react-router-dom'

import styles from './Avatar.module.css'

const Avatar = ({id, src, diameter}) => {

    return (
        <div style={{position: 'relative'}} >  
            <Link to={`/profile/${id}`} >
                <div className={styles.avatar} style={{width: diameter, height: diameter}}>
                    <img src={src} alt="avatar"/>
                </div>
            </Link>

        </div>
    )
}

export default Avatar
