const initialState ={
    token:'',
    isWrongPassword: false,
    user: {}
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH':
            return  action.payload
        case 'WRONG_PASSWORD':
            return {
                ...state, 
                isWrongPassword: action.payload
            }
        default:
            return state
    }
}

export default authReducer;