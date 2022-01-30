import { useSelector } from 'react-redux'
import {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import LoginForm from "../../components/auth/LoginForm"
import RegisForm from "../../components/auth/RegisForm"
import SlideForm from "../../components/auth/SlideForm"

import Logo from '../../assets/logo.png'

import styles from "./Auth.module.css"


const Auth = () => {
    const history = useHistory()

    const { auth } = useSelector(state => state)

    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })

    const [isLogin, setIsLogin] = useState(true)


    useEffect(() => {
        if(auth.token) history.push("/")

    }, [auth.token, history])
    

    return (
        <div className={styles.body}>
            <div className={styles.wrapper}>
                <div className={`${styles.container} ${!isDesktop && (isLogin ? '' : styles.flip)}`}>
                    {isDesktop && <SlideForm isLogin={isLogin} setIsLogin={setIsLogin} />}
                    <div className={styles.logo_wrapper}>
                        <div className={styles.dummy}></div>
                        <img className={styles.logo} alt="logo" src={Logo}/>
                    </div>
                    <div className={styles.login_form}>  
                        {isLogin && <LoginForm isLogin={isLogin} setIsLogin={setIsLogin} />}
                    </div>
                    <div className={styles.regis_form}>
                        {!isLogin && <RegisForm isLogin={isLogin} setIsLogin={setIsLogin} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth