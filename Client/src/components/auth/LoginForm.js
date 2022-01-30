import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import {AiOutlineUser,AiOutlineLock} from "react-icons/ai"

import BorderButton from '../util/BorderButton'
import { login } from '../../store/actions/authAction'

import styles from './LoginForm.module.css'

export default function LoginForm({setIsLogin}) {
    const dispatch = useDispatch()

    const [loginForm, setLoginForm] = useState({
        email:'',
        password: '',
        remember: false
    })

    const {email, password, remember} = loginForm

    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })

    const inputHandler = e => setLoginForm({...loginForm,[e.target.name]: e.target.value})

    const checkboxHandler = () => setLoginForm({...loginForm, remember: !remember})

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(loginForm))       
    }

    const forgotPasswordHandler = () => {
        dispatch({type: 'ALERT', payload: {error: 'Function incomplete'}})
    }

    return (
        <div className={styles.form_wrapper}>      
            <form onSubmit={submitHandler} className={styles.form} action="" method="post">
            <div className={styles.title}>Log in to DevUp</div>
            <div className={styles.inputs_wrapper}>
                <div className={styles.input_wrapper}>
                    <label className={styles.icon_wrapper} htmlFor="lg-email"><AiOutlineUser className={styles.icon}/></label>
                    <input spellCheck="false" onChange={inputHandler} value={email} className={styles.input} type="email" name="email" id="lg-email" placeholder="Email"/>
                </div>
                <div className={styles.input_wrapper}>
                    <label className={styles.icon_wrapper} htmlFor="lg-password"><AiOutlineLock className={styles.icon}/></label>
                    <input autoComplete='on' spellCheck="false" onChange={inputHandler} value={password} className={styles.input} type="password" name="password" id="lg-password" placeholder="Password"/>
                </div>
            </div>  
            <div className={styles.util_inline}>
                <div className={styles.input_radio_wrapper}>
                    <input spellCheck="false" onChange={checkboxHandler} type="checkbox" name="remember" id="remember" />
                    <label className={styles.remember} htmlFor="remember">Remember me</label>
                </div>
                <Link to="/forgot" onClick={forgotPasswordHandler} className={styles.forgot}>Forgot Password?</Link>
            </div>
                <BorderButton 
                type='submit' 
                color='white' 
                bgcolor={(loginForm.email.length==0||loginForm.password==0) ? '#cacaca' : '#487fec'} 
                cursor={(loginForm.email.length==0||loginForm.password==0) ? 'not-allowed' : 'pointer'} 
                value='Log in' 
                />
                {!isDesktop && <div className={styles.signup} onClick={()=>setIsLogin(false)}>wanna sign up?</div>}
            </form> 
        </div>
    )
}
