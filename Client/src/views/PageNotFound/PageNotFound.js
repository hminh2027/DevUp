import React from 'react'
import {Link} from 'react-router-dom'

import styles from './PageNotFound.module.css'

const PageNotFound = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.limit_height}>
                        <div className={styles.status}>404</div>
                    </div>
                    <div className={styles.error}>PAGE NOT FOUND</div>
                    <p>The page you are looking for  might have been removed.</p>
                    <Link to={'/'} >
                        <button className={styles.btn}>HOMEPAGE</button>
                    </Link>
                </div>
            </div>         
        </>
    )
}

export default PageNotFound
