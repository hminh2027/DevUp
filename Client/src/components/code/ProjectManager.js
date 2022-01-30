import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOwnProjects, getShareProjects } from '../../store/actions/projectAction'

import Spinner from '../../assets/Spinner.png'

import styles from './ProjectManager.module.css'
import ProjectFolder from './projectManager/ProjectFolder'

const ProjectManager = () => {
    const dispatch = useDispatch()
    const {auth, project} = useSelector(state=>state)

    useEffect(()=>{
        dispatch(getOwnProjects(auth))
        dispatch(getShareProjects(auth))
        
    },[auth.user._id])
    
    return (
        <div className={styles.project}>
            {project.loading ? 
            <div className={styles.spinner_wrapper}><img src={Spinner} alt='spinner' /></div>
            :
            <>
            <ProjectFolder showAdd={true} name='My project' projects={project.ownProjects} />
            <ProjectFolder name='Received project' projects={project.shareProjects} />
            </>
            }
            
        </div>
    )
}

export default ProjectManager
