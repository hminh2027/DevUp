import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import LikePostModal from '../modal/LikePostModal'
import { useMediaQuery } from 'react-responsive'
import Modal from '../util/Modal'

import styles from './PostCounter.module.css'

const PostCounter = ({post}) => {
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })
    const portal = document.getElementById('portal')

    const [isShowModal, setShowModal] = useState(false);
    
    return (
        <div className={styles.container}>
            <div onClick={()=>setShowModal(true)} className={styles.btn}>{post.likes.length>0 && `${post.likes.length} likes`}</div>
            <div className={styles.wrapper}>
                <div className={styles.btn}>{post.comments.length>0 && `${post.comments.length} comments`}</div>
                <div style={{marginLeft: '1rem'}} className={styles.btn}>{post.shares.length>0 && `${post.shares.length} shares`}</div>
            </div>
            
            {isShowModal && ReactDOM.createPortal(
            <Modal setIsEdit={setShowModal} width={isDesktop ? '30%':'100%'} height={isDesktop ? 'auto':'100%'} >
                <LikePostModal likes={post.likes} />
            </Modal>
            , portal)}
        </div>
    )
}

export default PostCounter
