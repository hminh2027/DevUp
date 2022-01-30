import { DeleteData, UpdateData } from "../EditData"

const initialState = {
    loading: false,
    posts: [],
    post: {}
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING_POST':
            return {
                ...state,
                loading: action.payload
            }
        case 'CREATE_POST':
            return {
                ...state,
                posts:[action.payload, ...state.posts]
            }
        case 'GET_POSTS':
            return {
                ...state, 
                posts: action.payload
            }
        case 'GET_MORE_POSTS':
            return {
                ...state, 
                posts: state.posts.concat(action.payload)
            }
        case 'UPDATE_POST':
            return {
                ...state,
                posts: UpdateData(state.posts, action.payload._id, action.payload)
            }
        case 'DELETE_POST':
                return {
                    ...state,
                    posts: DeleteData(state.posts, action.payload._id)
                }
        case 'GET_POST':
            return {
                ...state,
                post: action.payload
            }
        default:
            return state
    }
}

export default postReducer