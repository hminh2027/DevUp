import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { changePassword } from '../../store/actions/authAction'

import {FaCheck} from 'react-icons/fa'
import {ImCross} from 'react-icons/im'

import styles from './PasswordModal.module.css'

const PasswordModal = ({setChangePassword}) => {
    const dispatch = useDispatch()
    const { auth } = useSelector(state=>state)

    const [lengthValid, setLengthValid] = useState(false)
    const [numberValid, setNumberValid] = useState(false)
    const [oldPwValid, setOldPwValid] = useState(true)
    const [newPwValid, setNewPwValid] = useState(false)

    const [passwordForm, setPasswordForm] = useState({
        oldPw:'',
        newPw: '',
        newPw2: ''
    })

    useEffect(()=>{
        if(auth.isWrongPw) setOldPwValid(false)

    },[auth.isWrongPw])

    const inputHandler = e => setPasswordForm({...passwordForm,[e.target.name]: e.target.value})

    const checkHandler = () => {
        if(passwordForm.newPw.length>0) {
            passwordForm.newPw.length > 5 ? setLengthValid(true) : setLengthValid(false)
            passwordForm.newPw.search(/\d/) !== -1 ? setNumberValid(true) : setNumberValid(false)
        }
        passwordForm.newPw2.length>0 && (passwordForm.newPw === passwordForm.newPw2 ? setNewPwValid(true) : setNewPwValid(false))
    }

    const submitHandler = async () => {
        if (!lengthValid || !numberValid || !newPwValid) {
            dispatch({type: 'ALERT', payload: {warn: 'Recheck your input'}})
            return
        }
        dispatch(changePassword(auth, passwordForm))
    }

    const closeModal = () => {
        dispatch({type: 'MODAL', payload: false})
        setChangePassword(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.side}>
                <div className={styles.title}>Change Password</div>
                <div className={styles.text}>Passwords must contain:</div>
                <div className={styles.requirements}>
                    <div className={styles.requirement_wrapper}>
                        <div className={styles.icon_wrapper}>{lengthValid ? <FaCheck style={{color: '#48bf91'}} /> : <ImCross style={{color: '#e7727d'}} />}</div>                  
                        <div style={{textDecoration: `${lengthValid?'line-through':''}`}} className={styles.requirement}>At least 6 characters</div>
                    </div>
                    <div className={styles.requirement_wrapper}>
                        <div className={styles.icon_wrapper}>{numberValid ?  <FaCheck style={{color: '#48bf91'}} /> : <ImCross style={{color: '#e7727d'}} />}</div>                  
                        <div style={{textDecoration: `${numberValid?'line-through':''}`}} className={styles.requirement}>At least 1 number (0-9)</div>
                    </div>
                </div>
            </div>
            <div className={styles.side}>
                <div className={styles.input_container}>
                    <div className={styles.input_wrapper}>
                        <input style={!oldPwValid ? {borderColor:'red', backgroundColor:'#ffd0d0'} : {...styles}} value={passwordForm.oldPw} name='oldPw' onChange={inputHandler} onBlur={checkHandler} type="password" className={styles.input} placeholder='Input old password...' />
                        {!oldPwValid && <div style={{color:'#e7727d'}}>Old password not correct</div>}
                    </div>
                    <div className={styles.input_wrapper}>
                        <input style={(!lengthValid || !numberValid) ? {borderColor:'red', backgroundColor:'#ffd0d0'} : {...styles}} value={passwordForm.newPw} name='newPw' onChange={inputHandler} onBlur={checkHandler} type="password" className={styles.input} placeholder='Input new password...' />
                        {(!lengthValid || !numberValid) && <div style={{color:'#e7727d'}}>Password not meet requirements</div>}    
                    </div>
                    <div className={styles.input_wrapper}>
                        <input style={!newPwValid ? {borderColor:'red', backgroundColor:'#ffd0d0'} : {...styles}} value={passwordForm.newPw2} name='newPw2' onChange={inputHandler} onBlur={checkHandler} type="password" className={styles.input} placeholder='Confirm new password...' />
                        {!newPwValid && <div style={{color:'#e7727d'}}>Password not match</div>}
                    </div>
                </div>
                <div className={styles.button_container}>
                    <div onClick={submitHandler} className={styles.button}><button className={`${styles.btn} ${styles.save}`}>SAVE</button></div>
                    <div onClick={closeModal} className={styles.button}><button className={`${styles.btn} ${styles.cancel}`}>Cancel</button></div>
                </div>
            </div>
        </div>
    )
}

export default PasswordModal
