import { DeleteData, UpdateData } from "../EditData"

const initialState = {
    loading: false,
    ownProjects: [],
    shareProjects: [],
    project: null,
    tab: 0
}

const projectReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'LOADING_PROJECT':
            return {
                ...state,
                loading: action.payload
            }
        case 'OPEN_PROJECT':
            return {
                ...state,
                project: action.payload
            }
        case 'UPDATE_PROJECT':
            return {
                ...state,
                project: action.payload
            }
        case 'RENAME_PROJECT':
            return {
                ...state,
                ownProjects: UpdateData(state.ownProjects, action.payload._id, action.payload)
            }
        case 'DELETE_OWN_PROJECT':
            return {
                ...state,
                ownProjects: DeleteData(state.ownProjects, action.payload._id)
            }
        case 'DELETE_SHARE_PROJECT':
            return {
                ...state,
                shareProjects: DeleteData(state.shareProjects, action.payload._id)
            }
        case 'UPDATE_OWN_PROJECT':
            return {
                ...state,
                ownProjects: UpdateData(state.ownProjects, action.payload._id, action.payload)
            }
        case 'CHANGE_TAB':
            return {
                ...state,
                tab: action.payload
            }
        case 'GET_OWN_PROJECTS':
            return {
                ...state,
                ownProjects: action.payload,
            }
        case 'GET_SHARE_PROJECTS':
            return {
                ...state,
                shareProjects: action.payload,
            }
        default: return state;
    }
}

export default projectReducer;