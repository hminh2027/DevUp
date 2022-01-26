import React from 'react'

import styles from './GridGallery.module.css'

const GridGallery = ({list, length}) => {
   
    return (
        <div style={{gridTemplateColumns: `repeat(${length}, 1fr)`}} className={styles.container}>
            {list && list.map((item, index) =>(
                <div className={styles.item_wrapper} key={index} >
                    <div className={styles.dummy}></div>
                    <div className={styles.item}>
                        {item}
                    </div>
                    
                </div>
            ))}
        </div>
    )
}

export default GridGallery
