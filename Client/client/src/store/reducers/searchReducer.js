const initialState = {
    loading: false,
    users: [],
    friendUsers: [],
    projects: []
}

const searchReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'LOADING_SEARCH':
            return {
                ...state,
                loading: action.payload
            }
        case 'USER_SEARCH':
            return {
                ...state,
                users: action.payload
            }
        case 'FRIEND_USER_SEARCH':
            return {
                ...state,
                friendUsers: action.payload
            }    
        default: return state;
    }
}

export default searchReducer;