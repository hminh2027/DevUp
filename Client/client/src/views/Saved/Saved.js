import React from 'react'
import { useSelector } from 'react-redux'

import SavedPost from '../../components/saved/SavedPost'

import styles from './Saved.module.css'

const Saved = () => {
    
    const {auth} = useSelector(state=>state)

    return (
        <div className={styles.container}> 
            {auth.user.saved.length > 0 ? auth.user.saved.map((post, index)=> (
                <SavedPost key={index} post={post} />
            ))
            :
            <div className={styles.no_post}>No saved post available</div>}
        </div>
    )
}

export default Saved
