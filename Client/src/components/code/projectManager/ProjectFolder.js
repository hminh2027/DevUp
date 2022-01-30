import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useMediaQuery } from 'react-responsive'

import {FiPlusCircle} from 'react-icons/fi'
import NewProjectModal from '../../modal/NewProjectModal'
import Modal from '../../util/Modal'

import ProjectCard from './ProjectCard'

import styles from './ProjectFolder.module.css'
import GridGallery from '../../util/GridGallery'

const ProjectFolder = ({projects, name, showAdd}) => {

    const [isShowNewModal, setShowNewModal] = useState(false)
    const [prjs, setPrjs] = useState([])

    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })
    const portal = document.getElementById('portal')

    useEffect(() => {
        let projectTempArr = []
        
        {showAdd && projectTempArr.push(<div key='plus' onClick={()=>setShowNewModal(true)} className={styles.add_card}><FiPlusCircle/></div>)}

        projects.map((e, index) => {
                projectTempArr.push(<ProjectCard key={e._id} project={e} />)
        })
        
        setPrjs(projectTempArr)

    }, [projects])


    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <div className={styles.title}>{name}</div>
            </div>
            <div className={styles.content}>
                <GridGallery length={isDesktop ? '9' : '3'} list={prjs} />
            </div>

            {isShowNewModal && ReactDOM.createPortal(
            <Modal setIsEdit={setShowNewModal} width={isDesktop ? '30%': '100%'} >
                <NewProjectModal setIsEdit={setShowNewModal} />
            </Modal>
            , portal)}
        </div>
    )
}

export default ProjectFolder
