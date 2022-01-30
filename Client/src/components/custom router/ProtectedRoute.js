import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import LayoutDefault from '../../views/Layout/LayoutDefault'

function ProtectedRoute(props) {
    const FirstLogin = sessionStorage.getItem('FirstLogin') || localStorage.getItem('FirstLogin')

    
    return FirstLogin ? (props.path.includes('id') ? <Route {...props} /> : <LayoutDefault {...props} />) : <Redirect to='/'/>
}

export default ProtectedRoute
