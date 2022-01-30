import React, {useState} from 'react'

import BorderButton from '../util/BorderButton'

import styles from './SlideForm.module.css'

export default function SlideForm({isLogin, setIsLogin}) {
    const BODY_DATA_1 = {
        title: 'new here?',
        text1: 'You can create and post your experience here.',
        text2: 'Share your post - Increase your view.',
        valueBtn: 'Sign up'
    }

    const BODY_DATA_2 = {
        title: 'already have one?',
        text1: 'Go login and check your daily posts on newfeed',
        text2: 'Have a nice one!',
        valueBtn: 'Log in'
    }

    const [data,setData] = useState(BODY_DATA_1)

    const toggleSlide = () => {
        setIsLogin(!isLogin)
        if(!isLogin) setData(BODY_DATA_1)
        else setData(BODY_DATA_2)
    }

    return (
        <div className={`${styles.slide} ${!isLogin && styles.slide_animation}`}>
            <div className={styles.content_wrapper}>
                <div className={styles.container}>
                    <div className={styles.title}> {data.title} </div>
                    <div className={styles.text}> {data.text1} <br/> {data.text2} </div>
                    <BorderButton Func={toggleSlide}  color={'#487fec'} bgcolor={'white'} type={'text'} value={data.valueBtn} />
                </div>
            </div>
        </div>
    )
}
