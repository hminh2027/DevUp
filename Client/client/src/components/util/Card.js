import React from 'react'

import styles from './Card.module.css'

export default function Card(props) {
    return (        
        <div className={styles.card} style={{width: props.width, height: props.height, minHeight: props.minheight, backgroundColor: props.bg, margin: props.mg}}>
            {props.children}
        </div>
    )
}
