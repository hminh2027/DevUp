import {postAPI, getAPI, deleteAPI, patchAPI} from '../../apis/Axios'
import { createNotice } from './noticeAction'

export const createProject = (auth, body) => async (dispatch) => {
    try {
        dispatch({type: 'ALERT', payload: {loading: true}})

        const res = await postAPI('project', body, auth.token)

        dispatch({type: 'OPEN_PROJECT', payload: res.data.newCode})
        dispatch({type: 'CHANGE_TAB', payload: 1})
        
        dispatch({type: 'ALERT', payload: {success: res.data.msg}})

    } catch (err) {       
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const editableProject = (auth, id) => async (dispatch) => {
    try {
        const res = await patchAPI(`project/${id}/changeEditable`, null, auth.token)
        
        dispatch({type: 'UPDATE_PROJECT', payload: res.data.newCode})
        dispatch({type: 'ALERT', payload: {success: res.data.msg}})

    } catch (err) {       
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const openProject = (project) => (dispatch) => {
    dispatch({type: 'OPEN_PROJECT', payload: project})
    dispatch({type: 'CHANGE_TAB', payload: 1})
}

export const renameProject = (auth, name, id) => async (dispatch) => {
    try {
        dispatch({type: 'ALERT', payload: {loading: true}})
        const res = await patchAPI(`project/${id}/rename`, {name}, auth.token)

        dispatch({type: 'RENAME_PROJECT', payload: res.data.newCode})
        dispatch({type: 'ALERT', payload: {success: res.data.msg}})

    } catch (err) {       
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const saveProject = (auth, body, id) => async (dispatch) => {
    try {
        const res = await patchAPI(`project/${id}`, body, auth.token)

        dispatch({type: 'UPDATE_PROJECT', payload: res.data.newCode})
        dispatch({type: 'ALERT', payload: {success: res.data.msg}})

    } catch (err) {       
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const deleteProject = (auth, id) => async (dispatch) => {
    try {
        const res = await deleteAPI(`project/${id}`, auth.token)

        dispatch({type: 'DELETE_OWN_PROJECT', payload: res.data.deletedCode})
        dispatch({type: 'ALERT', payload: {success: res.data.msg}})

    } catch (err) { 
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const deleteReceivedProject = (auth, id) => async (dispatch) => {
    try {
        const res = await patchAPI(`project/${id}/received`, null,  auth.token)

        dispatch({type: 'DELETE_SHARE_PROJECT', payload: res.data.deletedCode})
        dispatch({type: 'ALERT', payload: {success: res.data.msg}})

    } catch (err) { 
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const getOwnProjects = (auth) => async (dispatch) => {
    try {
        dispatch({type: 'LOADING_PROJECT', payload: true})
        const res = await getAPI('project/own', auth.token)
       
        dispatch({type: 'GET_OWN_PROJECTS', payload: res.data.codes})
        dispatch({type: 'LOADING_PROJECT', payload: false})

    } catch (err) {       
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const getShareProjects = (auth) => async (dispatch) => {
    try {
        dispatch({type: 'LOADING_PROJECT', payload: true})
        const res = await getAPI('project/share', auth.token)
       
        dispatch({type: 'GET_SHARE_PROJECTS', payload: res.data.codes})
        dispatch({type: 'LOADING_PROJECT', payload: false})

    } catch (err) {       
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const shareProject = (receivers, id, auth, socket) => async (dispatch) => {
    try {
        dispatch({type: 'ALERT', payload: {loading: true}})
        const res = await postAPI(`project/${id}/share`, receivers, auth.token)

        let msg = {
            id: auth.user._id,
            receivers: receivers,
            url: auth.user._id,
            text: 'share a project with you!',
            type: 'profile',
            body: '',
            tag: 'PROJECT'
        }

        dispatch(createNotice(auth, msg, socket))

        dispatch({type: 'ALERT', payload: {success: res.data.msg}})
        dispatch({type: 'UPDATE_OWN_PROJECT', payload: res.data.code})
        
        dispatch({type: 'ALERT', payload: {loading: false}})

    } catch(err) {
        console.log(err)
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}