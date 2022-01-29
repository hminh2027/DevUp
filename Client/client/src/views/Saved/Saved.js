import React from 'react'
import { useSelector } from 'react-redux'

import { motion } from "framer-motion"

import SavedPost from '../../components/saved/SavedPost'

import styles from './Saved.module.css'

const Saved = () => {
    
    const {auth} = useSelector(state=>state)

    return (
        <div className={styles.container}>
            {auth.user.saved.length > 0 ? auth.user.saved.map((post, index)=> (
                <motion.div
                initial={{transform: 'translateY(10%)', opacity: 0}}
                animate={{transform: 'translateY(0%)', opacity: 1, transitionDuration: `.3s`, transitionDelay:`${(index+1)*0.2}s`}}
                key={index}>
                    <SavedPost key={index} post={post} />
                </motion.div>
            ))
            :
            <div className={styles.no_post}>No saved post available</div>}
        </div>
    )
}

export default Saved