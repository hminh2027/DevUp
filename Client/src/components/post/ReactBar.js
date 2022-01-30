import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactDOM from 'react-dom'

import {AiTwotoneHeart} from 'react-icons/ai'
import {IoMdShareAlt} from 'react-icons/io'
import {BsFillChatDotsFill} from 'react-icons/bs'

import { likePost, unlikePost } from '../../store/actions/postAction'

import Modal from '../util/Modal'
import SharePostModal from '../modal/SharePostModal'
import { useMediaQuery } from 'react-responsive'

import styles from './ReactBar.module.css'

const ReactBar = ({post, setIsComment, isComment}) => {
    const dispatch = useDispatch()

    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })
    const portal = document.getElementById('portal')

    const {auth, socket} = useSelector(state=>state)
    
    const [showModal, setShowModal] = useState(false)
    const [liked, setLiked] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if(post.likes.find(like=>like._id === auth.user._id)) setLiked(true)
        else setLiked(false)

    },[post.likes, auth.user._id])

    const likeHandler = async () => {
        if(loading) return
        setLoading(true)
        if(liked) await dispatch(unlikePost(auth, post, socket))
        else await dispatch(likePost(auth, post, socket))
        setLoading(false)
    }

    return (
        <div className={styles.react}>
            <div style={{color: `${liked ? '#ff4242': '#98A3AA'}`}} onClick={likeHandler} className={styles.react_btn}>
                <div className={styles.icon_wrapper}><AiTwotoneHeart/></div>
                <div className={styles.label}>Like</div>        
            </div>
            <div onClick={()=>setIsComment(!isComment)} className={styles.react_btn}>
                <div className={styles.icon_wrapper}><BsFillChatDotsFill/></div>
                <div className={styles.label}>Comment</div>            
            </div>
            <div onClick={()=>setShowModal(true)} className={styles.react_btn}>
                <div className={styles.icon_wrapper}><IoMdShareAlt/></div>
                <div className={styles.label}>Share</div>         
            </div>
            {showModal && ReactDOM.createPortal(
            <Modal setIsEdit={setShowModal} width={isDesktop ? '30%' : '100%'} height={isDesktop ? 'auto' : '100%'}>
                <SharePostModal post={post.shareContent?post.shareContent:post} setIsEdit={setShowModal} />
            </Modal>
            , portal)}
        </div>
    )
}

export default ReactBar
