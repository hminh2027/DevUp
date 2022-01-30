import React, { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { useMediaQuery } from 'react-responsive'

import { logout } from '../../store/actions/authAction'

import Avatar from '../util/Avatar'
import PasswordModal from '../modal/PasswordModal'
import Modal from '../util/Modal'

import styles from './ResponsiveMenu.module.css'

const ResponsiveMenu = () => {
    const {auth} = useSelector(state=>state)
    const dispatch = useDispatch();

    const [isChangePassword, setChangePassword] = useState(false);

    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })
    const portal = document.getElementById('portal')

    const passwordModal = () => {
        dispatch({type: 'MODAL' , payload: true});
        setChangePassword(true);
    }

    const list = [
        {label: 'Home', path: '/'},
        {label: 'Inbox', path: '/message'},
        {label: 'Code', path: '/project'},
        {label: 'Saved', path: '/saved'},
        {label: 'People', path: '/people'},
        {label: 'Change password', function: passwordModal},
        {label: 'Logout', function: ()=>dispatch(logout())}
    ]

    return (
        <div  className={styles.container}>
            {isChangePassword && ReactDOM.createPortal(
            <Modal setIsEdit={setChangePassword} width={isDesktop ? '50%':'100%'} height={isDesktop ? 'auto':'100%'} >
                <PasswordModal setChangePassword={setChangePassword} />
            </Modal>
            , portal)}

            <ul className={styles.nav}>
                <li style={{borderBottom: '2px solid black'}} className={styles.item}>
                    <Avatar diameter='3rem' src={auth.user.avatar} id={auth.user._id}/>
                    <div className={styles.name}>{auth.user.username}</div> 
                </li>
                {list.map((e, index)=>(
                    e.function ? 
                    <li key={index} onClick={e.function} className={styles.item}>
                        {e.label}
                    </li>
                    :
                    <Link key={index} to={e.path} replace>
                        <li className={styles.item}>
                            {e.label}
                        </li>
                    </Link>       
                ))}
            </ul>
        </div>
    )
}

export default ResponsiveMenu
