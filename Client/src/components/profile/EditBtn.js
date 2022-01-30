import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'

import { useMediaQuery } from 'react-responsive'

import Modal from '../util/Modal'
import EditProfileModal from '../modal/EditProfileModal'

import styles from './EditBtn.module.css'

const EditBtn = () => {
    const dispatch = useDispatch()

    const [isEdit, setIsEdit] = useState(false);


    const showModal = () => {
        dispatch({type: 'MODAL' , payload: true});
        setIsEdit(true);
    }

    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })
    const portal = document.getElementById('portal')

    return (
        <>
            {isEdit && ReactDOM.createPortal(
            <Modal setIsEdit={setIsEdit} width={isDesktop ? '50%' : '100%'} height={isDesktop ? 'auto' : '100%'} >
                <EditProfileModal setIsEdit={setIsEdit} />
            </Modal>
            , portal)}

            <button onClick={showModal} className={styles.btn}>Edit Profile</button>
        </>
    )
}

export default EditBtn
