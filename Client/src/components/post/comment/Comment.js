import React, { useState, useEffect } from 'react'

import CommentWrapper from './CommentWrapper'

import styles from './Comment.module.css'

const Comment = ({post}) => {
    const [mainCmt, setMainCmt] = useState([])
    const [replyCmt, setReplyCmt] = useState([])
    const [showCmt, setShowCmt] = useState([])
    const [cmtShowNumber, setCmtShowNumber] = useState(1)

    useEffect(()=>{
        const cmt = post.comments.filter(cmt => !cmt.reply)
        setMainCmt(cmt)
        const index = IndexCommentCalculate(cmt.length - cmtShowNumber)
        setShowCmt(cmt.slice(index))

    },[post.comments, cmtShowNumber])

    useEffect(()=>{
        const repCmt = post.comments.filter(cmt=>cmt.reply)
        setReplyCmt(repCmt)

    },[post.comments])

    const IndexCommentCalculate = (index) => {
        if(index <= 0) index = 0
        return index
    }
    
    return (
        mainCmt.length>0 && 
        <div className={styles.container}>
            {mainCmt.length - cmtShowNumber > 0 ?
            <div onClick={()=>setCmtShowNumber(cmtShowNumber + 5)} className={styles.toggle_cmt}>
                See more comments...
            </div> 
            :
            (mainCmt.length > 1 &&
            <div onClick={()=>setCmtShowNumber(1)} className={styles.toggle_cmt}>
                Hide comments...
            </div>
            )}

            {showCmt.map((cmt, index) => (
                <CommentWrapper key={index} replyComment={replyCmt.filter(rep=>rep.reply===cmt._id)} comment={cmt} post={post} />
            ))}
            <div className={styles.dropdown} id='dropdown_comment'></div>
        </div>
    )
}

export default Comment
