import React, { useState, useEffect } from 'react'
import {RiArticleLine, RiMovie2Line} from 'react-icons/ri'
import {AiFillHeart} from 'react-icons/ai'
import {BiCommentDetail, BiImage} from 'react-icons/bi'
import {BsCodeSlash} from 'react-icons/bs'
import {FaRegEye} from 'react-icons/fa'

import styles from './TagIcon.module.css'

const TagIcon = ({tag}) => {
    const [color, setColor] = useState('')
    const [icon, setIcon] = useState()

    useEffect(()=>{
        switch(tag) {
            // upload
            case 'POST':
                setIcon(<RiArticleLine/>)
                return setColor('#0f8ffd')
            case 'VIDEO':
                setIcon(<RiMovie2Line/>)
                return setColor('#7bcdd2')
            case 'IMAGE':
                setIcon(<BiImage/>)
                return setColor('#d498e9')
            // share
            case 'PROJECT':
                setIcon(<BsCodeSlash/>)
                return setColor('#ebb35e') 
            // interract
            case 'LIKE':
                setIcon(<AiFillHeart/>)
                return setColor('#ff4242')
            case 'COMMENT':
                setIcon(<BiCommentDetail/>)
                return setColor('#48bf91')
            case 'FOLLOW':
                setIcon(<FaRegEye/>)
                return setColor('#323d4b')
            
        }
    },[tag])

    return (
        <div style={{backgroundColor: color}} className={styles.tag_icon}>
            {icon}
        </div>
    )
}

export default TagIcon



