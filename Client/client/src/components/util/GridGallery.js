import React from 'react'

import { motion } from "framer-motion"

import styles from './GridGallery.module.css'

const GridGallery = ({list, length}) => {
   
    return (
        <div style={{gridTemplateColumns: `repeat(${length}, 1fr)`}} className={styles.container}>
            {list && list.map((item, index) =>(
                <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                className={styles.item_wrapper} 
                key={index}>
                    <div className={styles.dummy}></div>
                    <div className={styles.item}>
                        {item}
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default GridGallery
