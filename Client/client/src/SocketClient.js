import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const SocketClient = () => {
    const {auth, socket} = useSelector(state=>state)
    const dispatch = useDispatch()

    // Join User
    useEffect(()=>{
        socket.emit('joinUser', auth.user)
    },[socket, auth.user])

    // Like - Unlike
    useEffect(()=>{
        socket.on('likeToClient', newPost=>{
            dispatch({type: 'UPDATE_POST', payload: newPost})
            dispatch({type: 'GET_POST', payload: newPost})
        })
        return () => socket.off('likeToClient')
    },[socket, dispatch])

    useEffect(()=>{
        socket.on('unlikeToClient', newPost=>{
            dispatch({type: 'UPDATE_POST', payload: newPost})
            dispatch({type: 'GET_POST', payload: newPost})
        })
        return () => socket.off('unlikeToClient')
    },[socket, dispatch])

    // Comment - Uncomment
    useEffect(()=>{
        socket.on('commentToClient', newPost=>{
            dispatch({type: 'UPDATE_POST', payload: newPost})
            dispatch({type: 'GET_POST', payload: newPost})
        })
        return () => socket.off('commentToClient')
    },[socket, dispatch])
    
    useEffect(()=>{
        socket.on('uncommentToClient', newPost=>{
            dispatch({type: 'UPDATE_POST', payload: newPost})
            dispatch({type: 'GET_POST', payload: newPost})
        })
        return () => socket.off('uncommentToClient')
    },[socket, dispatch])

    // Follow - Unfollow
    useEffect(()=>{
        socket.on('followToClient', newUser =>{
            dispatch({type: 'AUTH', payload: {...auth, user: newUser}})
        })
        return () => socket.off('followToClient')
    },[socket, dispatch])

    useEffect(()=>{
        socket.on('unfollowToClient', newUser =>{
            dispatch({type: 'AUTH', payload: {...auth, user: newUser}})
        })
        return () => socket.off('unfollowToClient')
    },[socket, dispatch])

    // Notice - Delete Notice
    useEffect(()=>{
        socket.on('createNoticeToClient', msg =>{
            dispatch({type: 'CREATE_NOTICE', payload: msg})
            dispatch({type: 'SHOW_NOTICE', payload: true})
        
        })
        return () => socket.off('createNoticeToClient')
    },[socket, dispatch])

    // useEffect(()=>{
    //     socket.on('deleteNoticeToClient', notices =>{
    //         console.log(msg)
    //         dispatch({type: 'DELETE_NOTICE', payload: notices})
    //     })
    //     return () => socket.off('deleteNoticeToClient')
    // },[socket, dispatch])

    return (
        <>
            
        </>
    )
}

export default SocketClient
