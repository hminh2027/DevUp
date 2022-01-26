const initialState = {
    users: [],
    loading: false,
    isEnd: false
}

const suggestionReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'LOADING_SUGGESTION':
            return {
                ...state,
                loading: action.payload
            }
        case 'GET_SUGGESTION':
            return {
                ...state,
                users: action.payload,
            }
        case 'GET_MORE_SUGGESTION':
            return {
                ...state,
                users: state.users.concat(action.payload)
            }
        case 'ENDPOINT_SUGGESTION':
            return {
                ...state,
                isEnd: action.payload
            }
        default: return state
    }
}

export default suggestionReducer
