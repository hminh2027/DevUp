const initialState = {
    loading:'',
    success:'',
    error:'',
    warn: ''
}

const alertReducer = (state = initialState, action) => {
    switch (action.type){
        case 'ALERT':
            return action.payload
        default:
            return state
    }
}


export default alertReducer
