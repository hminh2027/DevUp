import React from 'react'

import styles from './BorderButton.module.css'

export default function BorderButton(props) {

    return (
        <div className={styles.btn_wrapper}>
            <button 
            onClick={props.Func} 
            className={styles.btn} 
            style={{backgroundColor: props.bgcolor, color: props.color, cursor: props.cursor}} 
            type={props.type}
            >
                {props.value}
            </button>
        </div>
    )
}
