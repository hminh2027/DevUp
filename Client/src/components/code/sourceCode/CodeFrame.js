import React, { useState } from 'react'

import {AiOutlineExpandAlt} from 'react-icons/ai'
import {CgMinimizeAlt} from 'react-icons/cg'

import styles from './CodeFrame.module.css'

const CodeFrame = ({srcDoc}) => {
    const [open, setOpen] = useState(false)

    return (
        <div className={`${styles.output} ${open ? '' : styles.collapsed}`}>
            <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
            />
            <div onClick={()=>setOpen(!open)} className={styles.expand_btn}>
                {open ? <CgMinimizeAlt/> : <AiOutlineExpandAlt/>}
            </div>
        </div>
    )}

export default CodeFrame
