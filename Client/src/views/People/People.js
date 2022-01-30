import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { motion } from 'framer-motion'

import UserCard from '../../components/util/UserCard'
import { getUsers } from '../../store/actions/peopleAction'
import InfiniteList from '../../components/util/InfiniteList'
import Spinner from '../../assets/Spinner.png'

import styles from './People.module.css'

const People = () => {
    const dispatch = useDispatch()
    const {auth, people} = useSelector(state => state)

    useEffect(()=>{
        dispatch(getUsers(auth))

    }, [auth.user.id])

    return (
        <div className={styles.container}>
            <div id='inf_users' className={styles.content}>
                {people.loading?
                <div className={styles.spinner_wrapper}>
                    <img src={Spinner} alt='spinner' />
                </div>                      
                :
                (<InfiniteList id={false} action='GET_MORE_USERS' api='/user' list={people.users} elem='inf_users' >
                    {people.users.length > 0 ? people.users.map((user, index) => (
                        <motion.div 
                        key={index} 
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        className={styles.item}>
                            <Link  to={`profile/${user._id}`} >
                                <UserCard height='3rem' avatar={user.avatar} username={user.username} />
                            </Link>
                        </motion.div>         
                    ))
                    :
                    <div className={styles.no_user} >No user available!</div>
                }
                </InfiniteList>)
                }
            </div>
        </div>
    )
}

export default People
