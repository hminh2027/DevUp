const initialState ={
    loading: false,
    users: []
}

const peopleReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING_USERS':
            return {...state, loading: action.payload}

        case 'GET_USERS':
            return {...state, users: action.payload}
        
        case 'GET_MORE_USERS':
            return {...state, users: state.users.concat(action.payload)}
            
        default:
            return state
    }
}

export default peopleReducer