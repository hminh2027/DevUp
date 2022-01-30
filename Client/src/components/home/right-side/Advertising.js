import React from 'react'

import Card from '../../../components/util/Card'
import Advertisement from '../../../assets/Advertisement.png'

import styles from './Advertising.module.css'

const Advertising = () => {
    return (
        <Card width='100%'>
                <div className={styles.image_wrapper}>
                    <a href='https://www.facebook.com/swag.lauch/'>
                        <img src={Advertisement} alt='ads' />
                    </a>
                </div>
                <div className={styles.body_wrapper}>
                    <div className={styles.title}>Introduce Myself</div>
                    <p className={styles.body}>Im Minh 20yo. My aspiraltional career path is to become a Software Engineer!</p>
                    <div className={styles.time}>SEP 25, 2021</div>
                </div>
            </Card>
    )
}

export default Advertising
