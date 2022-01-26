import {postAPI} from '../../apis/Axios'

export const signup = (form) => async (dispatch) => {
    try {
        dispatch({type: 'ALERT', payload: {loading: true}})
        const res = await postAPI('auth/signup', form)
        dispatch({type: 'AUTH', payload: {
            token: res.data.access_token,
            user: res.data.user
        }})
        localStorage.setItem('FirstLogin',true)
        dispatch({type: 'ALERT', payload: {success: res.data.msg}})

    } catch (err) {       
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const login = (form) => async (dispatch) => {
    try {
        dispatch({type: 'ALERT', payload: {loading: true}})
        const res = await postAPI('auth/login', form)
        dispatch({type: 'AUTH', payload: {
            token: res.data.access_token,
            user: res.data.user
        }})

        if (form.remember) localStorage.setItem('FirstLogin',true)
        else sessionStorage.setItem('FirstLogin',true)

        dispatch({type: 'ALERT', payload: {success: res.data.msg}})

    } catch (err){
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('FirstLogin')
        await postAPI('auth/logout')
        window.location.href = '/'

    } catch (err) {
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const changePassword = (auth, form) => async (dispatch) => {
    try {
        const res = await postAPI(`/auth/changepw`, {form}, auth.token)
        dispatch({type: 'ALERT', payload: {success: res.data.msg}})

    } catch(err) {
        dispatch({type: 'WRONG_PASSWORD', payload: true})
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
    }
}

export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem('FirstLogin') || sessionStorage.getItem('FirstLogin')
    if(firstLogin) {
        try {
            dispatch({type: 'ALERT', payload: {loading: true}})
            const res = await postAPI('auth/refresh_token')
            dispatch({type: 'AUTH', payload: {
                token: res.data.access_token,
                user: res.data.user
            }})
            dispatch({type: 'ALERT', payload: {}})
            
        } catch(err){
            dispatch({type: 'ALERT', payload: {error: err.response.data.msg}})
        }
    }
}