import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import profile from './profileReducer'
import post from './postReducer'
import modal from './modalReducer'
import socket from './socketReducer'
import notice from './noticeReducer'
import suggestion from './suggestionReducer'
import project from './projectReducer'
import search from './searchReducer'
import people from './peopleReducer'

export default combineReducers({
    auth,
    alert,
    profile,
    post,
    modal,
    socket,
    notice,
    suggestion,
    project,
    search,
    people
})