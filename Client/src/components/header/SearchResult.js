import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Search from './Search'
import UserCard from '../util/UserCard'
import { searchUser } from '../../store/actions/searchAction'
import OutsideClick from '../util/OutsideClick'

import { motion, AnimatePresence } from "framer-motion"

import Spinner from '../../assets/Spinner.png'
import styles from './SearchResult.module.css'

const SearchResult = () => {
    const [users, setUsers] = useState([])
    const [showResult, setShowResult] = useState(false)

    const {search} = useSelector(state=>state)

    useEffect(()=>{
        setUsers(search.users)

    },[search.users])

    return (
        <OutsideClick state={showResult} setState={setShowResult}>
            <div className={styles.container}>
                <Search searchAction={searchUser} setIsShow={setShowResult} setUsers={setUsers} />
                <AnimatePresence>
                    {showResult && 
                    <motion.div
                    initial={{maxHeight: 0, overflow: 'hidden'}}
                    animate={{maxHeight: 400, overflow: 'overlay'}}
                    transition={{duration: .5}}
                    exit={{ maxHeight: 0, overflow: 'hidden'}}
                    className={styles.results}>            
                        {search.loading ?
                        <div className={styles.spinner_wrapper}><img src={Spinner} alt='spinner' /></div>
                        :
                        users.length==0 ? 
                        <div className={styles.no_result}>No searching result</div>
                        :
                        users.map(user => 
                            <div key={user._id} className={styles.item_wrapper}>
                                <Link to={`/profile/${user._id}`} className={styles.item}>
                                    <UserCard height='2rem' avatar={user.avatar} username={user.username} />
                                </Link>             
                            </div>
                        )}
                    </motion.div>}
                </AnimatePresence>
            </div>
        </OutsideClick>
    )
}

export default SearchResult
