import { getAPI } from "../../apis/Axios";


export const searchUser = (data, auth) => async (dispatch) => {
    try {
        dispatch({type: 'LOADING_SEARCH', payload: true})

        const res = await getAPI(`user/search?username=${data}`, auth.token);
        dispatch({type: 'USER_SEARCH', payload: res.data.user})

        dispatch({type: 'LOADING_SEARCH', payload: false})

    } catch(err) {
        dispatch({type: 'ALERT', payload: {error: err.response.data.msg}});
    }
}

// no usage for now :D
// export const searchFriend = (data, auth) => async (dispatch) => {
//     try {
//         dispatch({type: 'LOADING_SEARCH', payload: true})

//         const res = await getAPI(`user/searchFriend?username=${data}`, auth.token);
//         dispatch({type: 'FRIEND_USER_SEARCH', payload: res.data.user})

//         dispatch({type: 'LOADING_SEARCH', payload: false})

//     } catch(err) {
//         dispatch({type: 'ALERT', payload: {error: err.response.data.msg}});
//     }
// }