import { DeleteData, UpdateData } from "../EditData"

const initialState = {
    loading: false,
    data: [],
    sound: false,
    popup: false,
}

const noticeReducer = (state = initialState, action) => {
    switch (action.type){
        case 'LOADING_NOTICES':
            return {
                ...state,
                loading: action.payload
            }
        case 'CREATE_NOTICE':
            return {
                ...state,
                data: [action.payload, ...state.data]
            }
        case 'GET_NOTICES':
            return {
                ...state,
                data: action.payload
            }
        case 'DELETE_NOTICE':
            return {
                ...state,
                data: DeleteData(state.data, action.payload)
            }
        case 'DELETE_NOTICES':
            return {
                ...state,
                data: action.payload
            }
        case 'SHOW_NOTICE':
            return {
                ...state,
                popup: action.payload
            }
        case 'UPDATE_NOTICE':
            return {
                ...state,
                data: UpdateData(state.data, action.payload._id, action.payload)
            }
        default:
            return state
    }
}


export default noticeReducer
