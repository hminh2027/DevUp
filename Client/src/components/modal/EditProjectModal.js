import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { renameProject } from '../../store/actions/projectAction'

import styles from './EditProjectModal.module.css'

const EditProjectModal = ({project, setIsEdit}) => {
    const dispatch = useDispatch()

    const {auth} = useSelector(state=>state)

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(project.name)

    const submitHandler = async () => {
        if(loading) return;
        setLoading(true)
        if(!name) return dispatch({type: 'ALERT', payload: {error: 'Project name not allowed to be empty!'}})
        await dispatch(renameProject(auth, name, project._id))
        dispatch({type: 'MODAL', payload: false})
        setLoading(false)
        setIsEdit(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>Rename Project</div>
            <div className={styles.input_wrapper}>
                <label htmlFor="name" >Project's Name: </label>
                <input style={{backgroundColor: `${!name?'#ffd0d0':''}`}} spellCheck="false" placeholder='Name...' id='name' type='text' name='name' value={name} onChange={e=>setName(e.target.value)} className={styles.input}/>
            </div>
            <button onClick={submitHandler} className={styles.submit}>Submit</button>
        </div>
    )
}

export default EditProjectModal
