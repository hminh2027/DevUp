import {deleteAPI, getAPI, patchAPI, postAPI} from '../../apis/Axios'
import {upload} from '../../apis/Cloudinary'
import {createNotice, deletePostNotices} from './noticeAction'

export const createPost = (data, auth, socket) => async (dispatch) => {
    let media = []
    try {
        dispatch({type: 'ALERT', payload: {loading: true}})
        dispatch({type: 'MODAL' , payload: true})
        if(data.files.length > 0) media = await upload(data.files)

        const res = await postAPI('post', {body: data.text, media: media}, auth.token)
        const newPost = {...res.data.newPost, user: auth.user}

        dispatch({type:'CREATE_POST', payload: newPost})
        dispatch({type: 'ALERT', payload: {success: res.data.msg}})

        let msg = {
            id: res.data.newPost._id,
            receivers: newPost.user.followers,
            url: res.data.newPost._id,
            type: 'post',
            body: data.body
        }
        msg = {...msg, 
            text: `${media.length > 0 ? (media[0].url.match(/video/i) ? 'add new video' : 'add new image') : 'post a status'}`,
            tag: `${media.length > 0 ? (media[0].url.match(/video/i) ? 'VIDEO' : 'IMAGE') : 'POST'}`,
        }

        dispatch(createNotice(auth, msg, socket))

    } catch(err) {
        dispatch({type: 'MODAL' , payload: false})
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const getPosts = (auth) => async (dispatch) => {
    try {
        dispatch({type: 'LOADING_POST', payload: true})
        const res = await getAPI('post', auth.token)

        if(res.data.result.length>0) dispatch({type: 'GET_POSTS', payload: res.data.result})       
        dispatch({type: 'LOADING_POST', payload: false})

    } catch(err) {
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const getPost = (auth, id) => async (dispatch) => {
    try {
        dispatch({type: 'LOADING_POST', payload: true})
        const res = await getAPI(`post/${id}`, auth.token)
        dispatch({type: 'GET_POST', payload: res.data.post})
        dispatch({type: 'LOADING_POST', payload: false})

    } catch(err) {
        dispatch({type: 'GET_POST', payload: err.response.data.post})
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const updatePost = (content, auth, id) => async (dispatch) => {
    try {
        dispatch({ type: 'ALERT', payload: {loading: true} })
        dispatch({type: 'MODAL' , payload: true})

        const res = await patchAPI(`post/${id}`, {body: content}, auth.token)

        // logic
        dispatch({type: 'UPDATE_POST', payload: res.data.newPost})
        dispatch({type: 'GET_POST', payload: res.data.newPost})
        
        dispatch({ type: 'MODAL' , payload: false})
        dispatch({ type: 'ALERT', payload: {success: res.data.msg} })

    } catch(err) {
        dispatch({ type: 'MODAL' , payload: false})
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const deletePost = (auth, id) => async (dispatch) => {
    try {
        const res = await deleteAPI(`post/${id}`, auth.token)
        dispatch({type: 'DELETE_POST', payload: res.data.post})
        dispatch({ type: 'ALERT', payload: {success: res.data.msg}})

        dispatch(deletePostNotices(auth, id))

    } catch(err) {
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const likePost = (auth, post, socket) => async (dispatch) => {
    if(auth.user._id === post.user._id) return dispatch({type: 'ALERT', payload: {warn: 'Dont like your own post! '}})
    const newPost = {...post, likes: [...post.likes, auth.user]}
    dispatch({type: 'UPDATE_POST', payload: newPost})
    socket.emit('likePost', newPost)

    try {
        await patchAPI(`post/${post._id}/like`, newPost, auth.token)

        const msg = {
            id: auth.user._id,
            receivers: auth.user.followers,
            text: 'like your post!',
            type: 'post',
            url: newPost._id,
            tag: 'LIKE',
            body: ''
        }

        dispatch(createNotice(auth, msg, socket))

    } catch(err) {
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const unlikePost = (auth, post, socket) => async (dispatch) => {
    const newLikes = post.likes.filter(like => like._id !== auth.user._id)
        const newPost = {...post, likes: newLikes}

        dispatch({type: 'UPDATE_POST', payload: newPost})
        socket.emit('unlikePost', newPost)

    try {
        await patchAPI(`post/${post._id}/unlike`, null, auth.token)     

    } catch(err) {
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const sharePost = (auth, post, body, socket) => async (dispatch) => {
    try {
        const res = await postAPI(`post/${post._id}/share`, {post, body}, auth.token)
        const newPost = {...res.data.newPost, user: auth.user}

        console.log(newPost)

        dispatch({type:'CREATE_POST', payload: newPost})

        console.log('wtf')

        let msg = {
            id: newPost._id,
            receivers: newPost.user.followers,
            url: newPost._id,
            body: body,
            type: 'post',
            text: 'share a post',
            tag: 'POST'
        }

        dispatch({ type: 'ALERT', payload: {success: res.data.msg} })

        dispatch(createNotice(auth, msg, socket))

    } catch(err) {
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const savePost = (auth, id) => async (dispatch) => {
    try {
        const res = await patchAPI(`post/${id}/save`, null, auth.token)

        dispatch({
            type: 'AUTH',
            payload: {
                ...auth,
                user: res.data.newUser
            }
        })

        dispatch({ type: 'ALERT', payload: {success: res.data.msg}})

    } catch(err) {
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const unsavePost = (auth, id) => async (dispatch) => {
    try {
        const res = await patchAPI(`post/${id}/unsave`, null, auth.token)

        dispatch({
            type: 'AUTH',
            payload: {
                ...auth,
                user: res.data.newUser
            }
        })
        
        dispatch({ type: 'ALERT', payload: {success: res.data.msg} })

    } catch(err) {
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}