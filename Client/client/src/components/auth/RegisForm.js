import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import {AiOutlineUser, AiOutlineLock, AiOutlineMail} from "react-icons/ai"

import BorderButton from '../util/BorderButton'
import {signup} from '../../store/actions/authAction'

import styles from './RegisForm.module.css'

export default function RegisForm({setIsLogin}) {
    const dispatch = useDispatch()

    const [regisForm,setRegisForm] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })

    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })

    const {username, email, password, password2} = regisForm

    const inputHandler = e => setRegisForm({...regisForm,[e.target.name]: e.target.value})

    const submitHander = e => {
        e.preventDefault()
        dispatch(signup(regisForm))
    }

    return (
        <div className={styles.form_wrapper}>
            <form onSubmit={submitHander} className={styles.form} action="" method="post">
                <div className={styles.title}>Sign up to DevUp</div>
                <div className={styles.inputs_wrapper}>
                    <div className={styles.input_wrapper}>
                        <label className={styles.icon_wrapper} htmlFor="rg-email"><AiOutlineMail className={styles.icon}/></label>
                        <input spellCheck="false" onChange={inputHandler} value={email} className={styles.input} type="email" name="email" id="rg-email" placeholder="Email"/>
                    </div>
                    <div className={styles.input_wrapper}>
                        <label className={styles.icon_wrapper} htmlFor="rg-username"><AiOutlineUser className={styles.icon}/></label>
                        <input spellCheck="false" onChange={inputHandler} value={username} className={styles.input} type="text" name="username" id="rg-username" placeholder="Username"/>
                    </div>
                    <div className={styles.input_wrapper}>
                        <label className={styles.icon_wrapper} htmlFor="rg-password"><AiOutlineLock className={styles.icon}/></label>
                        <input spellCheck="false" onChange={inputHandler} value={password} className={styles.input} type="password" name="password" id="rg-password" placeholder="Password"/>
                    </div>
                    <div className={styles.input_wrapper}>
                        <label className={styles.icon_wrapper} htmlFor="rg-password2"><AiOutlineLock className={styles.icon}/></label>
                        <input spellCheck="false" onChange={inputHandler} value={password2} className={styles.input} type="password" name="password2" id="rg-password2" placeholder="Password2"/>
                    </div>
                </div>
                <BorderButton 
                type={'submit'} 
                color={'white'} 
                bgcolor={'#487fec'} 
                value={'Sign up'} 
                bgcolor={(regisForm.email.length==0||regisForm.password==0||regisForm.user==0||regisForm.password2==0) ? '#cacaca' : '#487fec'} 
                cursor={(regisForm.email.length==0||regisForm.password==0||regisForm.user==0||regisForm.password2==0) ? 'not-allowed' : 'pointer'} 
                />
                {!isDesktop && <div className={styles.login} onClick={()=>setIsLogin(true)}>Wanna login?</div>}
            </form> 
        </div>
    )
}
