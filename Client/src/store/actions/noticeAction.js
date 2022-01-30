import {postAPI, deleteAPI, getAPI, patchAPI} from '../../apis/Axios'

export const createNotice = (auth, msg, socket) => async (dispatch) => {
  try {
    const res = await postAPI(`notice`, msg, auth.token)

    socket.emit('createNotice', {
      ...res.data.notice,
      user: {
        username: auth.user.username,
        avatar: auth.user.avatar
      }
    })

  }   catch (err) {
      dispatch({type: 'ALERT', payload: err.response.data.msg})
  }
}

export const deleteNotice = (auth, id) => async (dispatch) => {

  try {
    const notice = await deleteAPI(`notice/${id}`, auth.token)
    
    notice.status = 200 && dispatch({type: 'ALERT', payload: 'Notice deleted!'})
    
    dispatch({type: 'DELETE_NOTICE', payload: id})


  } catch(err) {
    dispatch({type: 'ALERT', payload: err.response.data.msg})
  }
}

export const deletePostNotices = (auth, url) => async (dispatch) => {
  try {
    deleteAPI(`notice/postDelete?url=${url}`, auth.token)

  } catch(err) {
    dispatch({type: 'ALERT', payload: err.response.data.msg})
  }
}

export const deleteNotices = (auth) => async (dispatch) => {
  try {
    const res = await deleteAPI(`notice`, auth.token)
    dispatch({type: 'DELETE_NOTICES', payload: []})

  } catch(err) {
    dispatch({type: 'ALERT', payload: err.response.data.msg})
  }
}

export const unreadNotice = (auth, msg) => async (dispatch) => {
  try {
    const res = await patchAPI(`notice/${msg._id}/unread`, null, auth.token)
    
    dispatch({type: 'UPDATE_NOTICE' , payload: res.data.notice})

  } catch(err) {
    dispatch({type: 'ALERT', payload: err.response.data.msg})
  }
}

export const readNotice = (auth, msg) => async (dispatch) => {
  try {
    console.log(msg)
    if(!msg) return
    const res = await patchAPI(`notice/${msg._id}/read`, null, auth.token)

    dispatch({type: 'UPDATE_NOTICE' , payload: res.data.notice})

  } catch(err) {
    dispatch({type: 'ALERT', payload: err.response.data.msg})
  }
}

export const readNotices = (auth) => async (dispatch) => {
  try {
    const res = await patchAPI('notice/read', null, auth.token)

  } catch(err) {
    dispatch({type: 'ALERT', payload: err.response.data.msg})
  }
}

export const getNotices = (auth) => async (dispatch) => {
  try {
    dispatch({type: 'LOADING_NOTICES', payload: true})
    const res = await getAPI(`notice`, auth.token)
    dispatch({type: 'GET_NOTICES' , payload: res.data.notices})
    dispatch({type: 'LOADING_NOTICES', payload: false})

  } catch(err) {
    dispatch({type: 'ALERT', payload: err.response.data})
  }
}