import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import { deleteProject, deleteReceivedProject, openProject } from '../../../store/actions/projectAction'

import { AiOutlineEdit, AiOutlineShareAlt, AiOutlineDelete} from 'react-icons/ai'
import {MdOpenInNew} from 'react-icons/md'
import {GoPrimitiveDot} from 'react-icons/go'

import Modal from '../../util/Modal'
import EditProjectModal from '../../modal/EditProjectModal'
import ShareProjectModal from '../../modal/ShareProjectModal'

import styles from './ProjectCard.module.css'

const ProjectCard = ({project}) => {
    const dispatch = useDispatch()
    const {auth} = useSelector(state=>state)

    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })
    const portal = document.getElementById('portal')

    const [isShowEditModal, setShowEditModal] = useState(false)
    const [isShowShareModal, setShowShareModal] = useState(false)
    const [isReceived, setisReceived] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        project.receivers.find(r=>r._id == auth.user._id) && setisReceived(true)

    }, [auth.user._id, project.receivers])

    const editHandler = () => {
        dispatch({type: 'MODAL', payload: true})
        setShowEditModal(true)
    }

    const shareHandler = () => {
        dispatch({type: 'MODAL', payload: true})
        setShowShareModal(true)
    }

    const openHandler = () => {
        dispatch(openProject(project))
    }

    const deleteOwnProjectHandler = async () => {
        if(loading) return
        setLoading(true)
        await dispatch(deleteProject(auth, project._id))
        setLoading(false)
    }

    const deleteReceivedProjectHandler = async () => {
        if(loading) return
        setLoading(true)
        await dispatch(deleteReceivedProject(auth, project._id))
        setLoading(false)
    }

    return (
        <div style={{backgroundImage:`url(${project.author.avatar})`}} className={styles.container}>
                <div onClick={openHandler} className={styles.open}><MdOpenInNew/></div>
                <div className={styles.content}>
                    <div className={styles.infor}>
                        <div className={styles.name}>{project.name}</div>
                        <div className={styles.author}>Author: {project.author.username}</div>
                    </div>
                    <div className={styles.btn_group}>
                        {!isReceived && <div onClick={editHandler} className={styles.icon_wrapper}><AiOutlineEdit/></div>}
                        {isReceived ? 
                        <div onClick={deleteReceivedProjectHandler} className={styles.icon_wrapper}><AiOutlineDelete/></div>:
                        <div onClick={deleteOwnProjectHandler} className={styles.icon_wrapper}><AiOutlineDelete/></div>
                        }
                        {!isReceived && <div onClick={shareHandler} className={styles.icon_wrapper}><AiOutlineShareAlt/></div>}
                    </div>
                </div>
                {!project.isRead && <div className={styles.dot}><GoPrimitiveDot/></div>}
            

            {isShowEditModal && ReactDOM.createPortal(
            <Modal setIsEdit={setShowEditModal} width={isDesktop ? '30%': '100%'} >
                <EditProjectModal project={project} setIsEdit={setShowEditModal} />
            </Modal>
            , portal)}

            {isShowShareModal && ReactDOM.createPortal(
            <Modal setIsEdit={setShowShareModal} width={isDesktop ? '40%': '100%'} height={isDesktop ? 'auto': '100%'} >
                <ShareProjectModal project={project} setIsEdit={setShowShareModal} />
            </Modal>
            , portal)}
        </div>
    )
}

export default ProjectCard
