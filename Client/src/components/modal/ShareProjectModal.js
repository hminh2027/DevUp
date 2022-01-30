import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {MdRemove} from 'react-icons/md'
import { shareProject } from '../../store/actions/projectAction'

import SearchResult from '../code/projectManager/search/SearchResult'
import UserCard from '../util/UserCard'

import styles from './ShareProjectModal.module.css'

const ShareProjectModal = ({project, setIsEdit}) => {
    const dispatch = useDispatch()

    const {auth, socket} = useSelector(state=>state)
    const [selectedUsers, setSelectedUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setSelectedUsers(project.receivers)
    },[project])

    const unselectUser = (user) => {   
        const newUsers = selectedUsers.filter(u => u._id != user._id)
        setSelectedUsers(newUsers)
    }

    const submitHandler = async () => {
        if(loading) return
        setLoading(true)
        const ids = selectedUsers.map(u=> u._id)
        await dispatch(shareProject(ids, project._id, auth, socket))
        dispatch({type: 'MODAL', payload: false})
        setLoading(false)
        setIsEdit(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>Share Project</div>
            <SearchResult selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
            <div className={styles.text}>List of selected peoples: {selectedUsers.length}</div>
            <div className={styles.content}>
                {selectedUsers.map(user=>(
                    <div onClick={()=>unselectUser(user)}  key={user._id} className={styles.user_wrapper}>
                        <UserCard height='2rem' avatar={user.avatar} username={user.username} />
                        <div className={styles.remove_btn}><MdRemove/></div>
                    </div>
                    
                ))}    
            </div>
            <button onClick={submitHandler} className={styles.submit}>Update</button>
        </div>
    )
}

export default ShareProjectModal
