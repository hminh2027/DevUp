import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ReactDOM from 'react-dom'

import Auth from './views/Auth/Auth'
import Home from './views/Home/Home'
import { PageRender } from './components/custom router/PageRender'
import ProtectedRoute from './components/custom router/ProtectedRoute'

import Alert from './components/alert/Alert'
import NotificationDisplay from './components/notification/NotificationDisplay'

import io from 'socket.io-client'
import SocketClient from './SocketClient'

import { getNotices } from './store/actions/noticeAction'
import {refreshToken} from './store/actions/authAction'

function App() {
  const dispatch = useDispatch()
  
  const alert = document.getElementById('alert')
  const notification = document.getElementById('notification')

  const  {auth}  = useSelector(state => state)


  useEffect(()=>{
    dispatch(refreshToken())
    const socket = io()
    dispatch({type: 'SOCKET', payload: socket})
    return ()=> socket.close()
    
  }, [dispatch])

  useEffect(()=>{
    if(auth.token) {
      dispatch(getNotices(auth))
    }
  }, [dispatch, auth.token])

  return (
  <Router>
    {ReactDOM.createPortal(<Alert />, alert)}
    {ReactDOM.createPortal(<NotificationDisplay/>, notification)}
    
    {auth.token && <SocketClient/>}
    <Switch>
      <Route exact path='/' component={auth.token ?  Home : Auth} />
      <Route exact path='/home' component={auth.token ?  Home : Auth} />
      <ProtectedRoute exact path='/:page' component={PageRender} />
      <ProtectedRoute exact path='/:page/:id' component={PageRender} />
    </Switch>
  </Router>
  )
  
}
export default App
