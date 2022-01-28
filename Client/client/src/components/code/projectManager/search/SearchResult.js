import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Search from '../../../header/Search'
import UserCard from '../../../util/UserCard'
import { searchUser } from '../../../../store/actions/searchAction'

import { motion, AnimatePresence } from "framer-motion"

import Spinner from '../../../../assets/Spinner.png'
import styles from './SearchResult.module.css'
import OutsideClick from '../../../util/OutsideClick'

const SearchResult = ({setSelectedUsers, selectedUsers}) => {
    const {search} = useSelector(state=>state)

    const [users, setUsers] = useState([])
    const [showResult, setShowResult] = useState(false)


    useEffect(()=>{
        setUsers(search.users)

    },[search.users])

    const selectUser = (user) => {
        !selectedUsers.some(u=>u._id === user._id) && setSelectedUsers([...selectedUsers, user])
    }

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
                        <div className={styles.no_result}>No searching result...</div>
                        :
                        users.map(user => 
                            <div onClick={()=>selectUser(user)} key={user._id} className={styles.item_wrapper}>
                                <div style={{backgroundColor: `${selectedUsers.some(u=>u._id === user._id) && '#F1F1F5'}`}}  className={styles.item}>
                                    <UserCard height='2rem' avatar={user.avatar} username={user.username} />
                                </div>
                            </div>
                        )}
                    </motion.div>}
                </AnimatePresence>
            </div>
        </OutsideClick>

    )
}

export default SearchResult
