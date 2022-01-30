import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

import UserCard from '../../util/UserCard'
import Card from '../../util/Card'
import FollowBtn from '../../profile/FollowBtn'
import { getSuggestion } from '../../../store/actions/suggestionAction'

import {AiOutlineReload} from 'react-icons/ai'

import { motion } from "framer-motion"
import Spinner from '../../../assets/Spinner.png'

import styles from './FriendSuggestion.module.css'

const FriendSuggestion = () => {
    const dispatch = useDispatch()
    
    const {suggestion, auth} = useSelector(state=>state)
    const [page, setPage] = useState(1)

    useEffect(()=>{
        dispatch(getSuggestion(auth, page))
    },[auth.user._id, dispatch, page])

    const reloadSuggestion = () => {
        !suggestion.isEnd ? setPage(page+1) : dispatch({type: 'ALERT', payload: {warn: 'No new suggestions!'}})
    }
     
    return (
        <Card width='100%' mg='2rem 0'>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.title}>People you may know</div>
                    <motion.div
                    onClick={reloadSuggestion}
                    className={styles.reload_btn}
                    whileHover={{rotate: 200, scale: 1.2}}
                    >
                        <AiOutlineReload/>
                    </motion.div>
                </div>
                {suggestion.loading?
                <div className={styles.spinner_wrapper}><img src={Spinner} alt='spinner' /></div>
                :
                <div className={styles.suggestion}>
                    {suggestion.users.length>0 && suggestion.users.map((user, index)=>(
                        <motion.div 
                        key={user._id} 
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        className={styles.item_wrapper}>
                            <Link className={styles.item} to={`/profile/${user._id}`}>
                                <UserCard height='3rem' color='#64BDF1' avatar={user.avatar} username={user.username}/>
                            </Link>
                            <FollowBtn user={user}/>
                        </motion.div>
                    ))}
                </div>
                }            
            </div>        
        </Card>
        
    )
}

export default FriendSuggestion
