import { getAPI } from '../../apis/Axios'

export const getUsers = (auth) => async (dispatch) => {
    try {
        dispatch({type: 'LOADING_USERS', payload: true})
        const res = await getAPI(`/user` ,auth.token)
        dispatch({type: 'GET_USERS', payload: res.data.result})
        dispatch({type: 'LOADING_USERS', payload: false})

    } catch(err) {
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}