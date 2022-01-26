import React from 'react'
import styles from './RoundWrapper.module.css';

export default function RoundWrapper(props) {
    return (
        <div onClick={props.Func} className={styles.btn_wrapper} style={{ margin: props.margin, backgroundColor: props.bgcolor, color: props.color, width: props.diameter, height: props.diameter, fontSize: props.fontsize}}>
            {props.children}
        </div>
    )
}
