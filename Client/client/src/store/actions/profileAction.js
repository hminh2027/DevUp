import { getAPI, patchAPI } from '../../apis/Axios'
import { upload } from '../../apis/Cloudinary'
import { createNotice } from './noticeAction'

export const getUser = (auth, id) => async (dispatch)=> {
    try {
        dispatch({type: 'LOADING_PROFILE', payload: true})

        const res = await Promise.all([getAPI(`/user/${id}`, auth.token), await getAPI(`/post/user_posts/${id}`, auth.token)])

        dispatch({type:'GET_USER', payload: res[0].data.user})
        dispatch({type:'GET_POSTS', payload: res[1].data.result})

        dispatch({type: 'LOADING_PROFILE', payload: false})

    } catch(err) {
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}


export const follow = (auth, user, socket) => async (dispatch) => {
    let profileUser = {...user, followers: [...user.followers, auth.user]}

    if(auth.user._id === user._id) dispatch({type: 'FOLLOW' , payload: profileUser})
    dispatch({type: 'AUTH', payload: {...auth, user: {...auth.user, following: [...auth.user.following, profileUser]}}})

    try {
        const res = await patchAPI(`user/${user._id}/follow`, null, auth.token)
        socket.emit('follow', res.data.newUser)

        const msg = {
            id: auth.user._id,
            receivers: [user],
            text: 'is following you!',
            type: 'profile',
            url: auth.user._id,
            tag: 'FOLLOW',
            body: ''        
        }

        dispatch(createNotice(auth, msg, socket))
    
    } catch(err) {
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const unfollow = (auth, user, socket) => async (dispatch) => {
    let  newFollowers = user.followers.map(fl=>fl._id!==auth.user._id && fl)
    let profileUser = {...user, followers: newFollowers}
    let newFollowing = auth.user.following.map(fl=>fl._id!==profileUser._id && fl)

    if(auth.user._id === user._id) dispatch({type: 'UNFOLLOW' , payload: profileUser})
    dispatch({type: 'AUTH', payload: {...auth, user: {...auth.user, following: newFollowing}}})

    try {
        const res = await patchAPI(`user/${user._id}/unfollow`, null, auth.token)
        socket.emit('unfollow', res.data.newUser)
        
    } catch(err) {
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const updateUser = (auth, data, image) => async (dispatch) => {
    try {
        dispatch({ type: 'ALERT', payload: {loading: true} })
        let avatar,background
        if(image.avatar) avatar = await upload([image.avatar])
        if(image.background) background = await upload([image.background])       

        const res = await patchAPI(`user`, {
            ...data,
            avatar: avatar ? avatar[0].url : auth.user.avatar,
            background: background ? background[0].url : auth.user.background
        }, auth.token)

        dispatch({
            type: 'AUTH',
            payload: {
                ...auth,
                user: {
                    ...auth.user, ...data,
                    avatar: avatar ? avatar[0].url : auth.user.avatar,
                    background: background ? background[0].url : auth.user.background,
                }
            }
        })

        dispatch({
            type: 'UPDATE_PROFILE', payload: res.data.newUser
        })

        dispatch({ type: 'ALERT', payload: {success: res.data.msg} })

    } catch(err) {
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}