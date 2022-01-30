const initialState = {
    user: {},
    loading: false
}

const profileReducer = (state = initialState, action) => {
    switch (action.type){
        case 'LOADING_PROFILE':
            return {
                ...state,
                loading: action.payload
            }
        case 'GET_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'UPDATE_PROFILE':
            return {
                ...state,
                user: action.payload
            }
        case 'FOLLOW':
            return {
                ...state,
                user: action.payload
            }
        case 'UNFOLLOW':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}


export default profileReducer
