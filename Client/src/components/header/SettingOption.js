import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import PasswordModal from '../modal/PasswordModal'
import Modal from '../util/Modal'
import DropdownCard from '../util/DropdownCard'

import {IoExitOutline, IoLockClosedOutline} from 'react-icons/io5'
import { logout } from '../../store/actions/authAction'

import styles from './SettingOption.module.css'


const SettingOption = ({isShow, setIsShow}) => {
    const dispatch = useDispatch();

    const [isChangePassword, setChangePassword] = useState(false);

    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })
    const portal = document.getElementById('portal')

    const passwordModal = () => {
        dispatch({type: 'MODAL' , payload: true});
        setChangePassword(true);
    }

    return (
        <>
        {isChangePassword && ReactDOM.createPortal(
            <Modal setIsEdit={setChangePassword} width={isDesktop ? '50%':'100%'} height={isDesktop ? 'auto':'100%'} >
                <PasswordModal setChangePassword={setChangePassword} />
            </Modal>
        , portal)}
        <DropdownCard isShow={isShow} setIsShow={setIsShow} bottom={`-20px`}>
            <div className={styles.option_item} onClick={passwordModal} >
                <IoLockClosedOutline className={styles.icon} />
                <div className={styles.text}>Password</div>
            </div>
            <Link to='/' >
                <div onClick={()=>dispatch(logout())} className={styles.option_item} >
                    <IoExitOutline className={styles.icon} />
                    <div className={styles.text}>Logout</div>
                </div>
            </Link>
        </DropdownCard>
        </>
    )
}

export default SettingOption
