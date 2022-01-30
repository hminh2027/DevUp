import React, { useEffect, useState } from 'react'
import CommentCard from './CommentCard'
import InputComment from './InputComment'
import {MdExpandMore} from 'react-icons/md'
import styles from './CommentWrapper.module.css'

const CommentWrapper = ({post, comment, replyComment}) => {
    const [onReply, setOnReply] = useState(false)
    const [cmtShowNumber, setCmtShowNumber] = useState(1)
    const [showCmt, setShowCmt] = useState([])

    useEffect(()=>{
        const index = IndexCommentCalculate(replyComment.length - cmtShowNumber)
        setShowCmt(replyComment.slice(index))

    },[replyComment, cmtShowNumber])

    const IndexCommentCalculate = (index) => {
        if(index <= 0) index = 0
        return index
    }

    return (
        <div className={styles.comment_wrapper}>
            <CommentCard setOnReply={setOnReply} post={post} comment={comment} />
            <div className={styles.reply_wrapper}>
                {showCmt.map((cmt, index) => (
                    cmt.reply && <CommentCard setOnReply={setOnReply} key={index} comment={cmt} post={post} />
                ))}
                {replyComment.length - cmtShowNumber > 0 &&
                <div onClick={()=>setCmtShowNumber(cmtShowNumber + 5)} className={styles.toggle_cmt}>
                    <MdExpandMore/> See more reply
                </div>
                }
            </div>
            {onReply && 
            <div className={styles.rep_input}>
                <InputComment post={post} onReply={onReply} />
            </div>
            }
        </div>
    )
}

export default CommentWrapper
