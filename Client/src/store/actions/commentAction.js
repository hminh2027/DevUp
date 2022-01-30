import { deleteAPI, patchAPI, postAPI } from "../../apis/Axios"
import {createNotice, deleteNotice} from './noticeAction'

export const createComment = (auth, newComment, post, socket) => async (dispatch) => {
    try {
        const data = {...newComment, postId: post._id, postUserId: post.user._id}
        const res = await postAPI('comment', data, auth.token)
        // logic
        const newData = {...res.data.newComment, user: auth.user}
        const newPost = {...post, comments: [...post.comments, newData]}

        dispatch({type: 'UPDATE_POST', payload: newPost})
        dispatch({type: 'GET_POST', payload: newPost})

        socket.emit('commentPost', newPost)

        const msg = {
            id: res.data.newComment._id,
            receivers: newComment.reply ? [newComment.tag] : [post.user._id],
            text: newComment.reply ? 'reply your comment' : 'comment to your post',
            type: 'post',
            url: newPost._id,
            tag: 'COMMENT',
            body: ''
        }

        dispatch(createNotice(auth, msg, socket))

    } catch(err) {
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const deleteComment = (auth, comment, post, socket) => async (dispatch) => {
    try {
        // delete the main and reply comments
        const deleteArr = [...post.comments.filter(cmt=>cmt.reply===comment._id), comment]
        // logic
        const newPost = {
            ...post, 
            comments: post.comments.filter(cmt=>!deleteArr.find(deletedCmt=>cmt._id===deletedCmt._id))
        }

        dispatch({type: 'UPDATE_POST', payload: newPost})
        dispatch({type: 'GET_POST', payload: newPost})

        socket.emit('uncommentPost', newPost)

        deleteArr.forEach(async item=>{
            await deleteAPI(`comment/${item._id}`, auth.token)

            const msg = {
                id: item._id,
                receivers: comment.reply ? [comment.tag._id] : [post.user._id],
                type: 'post',
                url: post._id
            }
            dispatch(deleteNotice(auth, msg))
        })


    } catch(err) {
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const updateComment = (auth, body, post, comment) => (dispatch) => {
    const newComment = {...comment, body: body}
    const newComments = post.comments.map(cmt=>cmt._id===comment._id?newComment:cmt)

    const newPost = {...post, comments: newComments}
    
    dispatch({type: 'UPDATE_POST', payload: newPost})
    dispatch({type: 'GET_POST', payload: newPost})

    try {
        const res = patchAPI(`comment/${comment._id}`, {body}, auth.token)

    } catch(err) {
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}