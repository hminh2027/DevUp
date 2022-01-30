import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {createProject} from '../../store/actions/projectAction'

import styles from './NewProjectModal.module.css'

const NewProjectModal = ({setIsEdit}) => {
    const dispatch = useDispatch()

    const {auth} = useSelector(state=>state)

    const [name, setName] = useState('')
    const [isEditable, setIsEditable] = useState(false)

    const submitHandler = async () => {
        if(!name) return dispatch({type: 'ALERT', payload: {error: 'Project name not allowed to be empty!'}})
        const body = {name, isEditable}
        await dispatch(createProject(auth, body))
        dispatch({type: 'MODAL', payload: false})
        setIsEdit(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>New Project</div>
            <div className={styles.input_wrapper}>
                <label htmlFor="name" >Project's Name: </label>
                <input style={{backgroundColor: `${!name?'#ffd0d0':''}`}} spellCheck="false" placeholder='Name...' id='name' type='text' name='name' value={name} onChange={e=>setName(e.target.value)} className={styles.input}/>
            </div>
            <div className={styles.input_wrapper}>
                <label htmlFor="editable">Editable when sharing: </label>
                <input onChange={()=>setIsEditable(!isEditable)} id='editable' type='checkbox' name='editable' className={styles.input}/>
            </div>     
            <button onClick={submitHandler} className={styles.submit}>Create</button>
        </div>
    )
}

export default NewProjectModal
