import { getAPI } from "../../apis/Axios"

export const getSuggestion = (auth, page) => async (dispatch) => {
    try {
        dispatch({type: 'LOADING_SUGGESTION', payload: true})
        const res = await getAPI(`/user/suggest?page=${page}`, auth.token)

        if(res.data.users.length > 0) dispatch({type:'GET_SUGGESTION', payload: res.data.users})
        else dispatch({type:'ENDPOINT_SUGGESTION', payload: true})
        dispatch({type: 'LOADING_SUGGESTION', payload: false})

    } catch(err) {
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const getResSuggestion = (auth) => async (dispatch) => {
    try {
        dispatch({type: 'LOADING_SUGGESTION', payload: true})
        const res = await Promise.all([getAPI(`/user/suggest?page=1`, auth.token), getAPI(`/user/suggest?page=2`, auth.token)])


        if(res[0].data.users.length == 0 || res[1].data.users.length == 0) dispatch({type:'ENDPOINT_SUGGESTION', payload: true})
        else {
            const suggestions = [...res[0].data.users, ...res[1].data.users]
            dispatch({type:'GET_SUGGESTION', payload: suggestions})
        }
        dispatch({type: 'LOADING_SUGGESTION', payload: false})

    } catch(err) {
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}