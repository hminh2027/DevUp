import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {AiOutlineSearch} from 'react-icons/ai'

import styles from './Search.module.css'

const Search = ({searchAction, setUsers, setIsShow}) => {
    const dispatch = useDispatch()
    
    const {auth} = useSelector(state=>state)
    const [data, setData] = useState('')
    const debouncedUserInput = useDebounce(data, 500)

    useEffect(()=>{
        if(!data) {
            setUsers([])
            setIsShow(false)
        }
        else submitHandler(debouncedUserInput)   
    },[debouncedUserInput])

    const submitHandler = async (debouncedUserInput) => {
        if(!debouncedUserInput) return
        await dispatch(searchAction(debouncedUserInput, auth))
        setIsShow(true)
    }

    const inputHandler = e => {
        setData(e.target.value)
    }

    function useDebounce (value, wait = 500) {
        const [debounceValue, setDebounceValue] = useState(value)
      
        useEffect(() => {
          const timer = setTimeout(() => {
            setDebounceValue(value)
          }, wait)
          return () => clearTimeout(timer)
        }, [value, wait])
     
        return debounceValue
    }

    return (
        <div className={styles.search_bar}>
            <div onClick={()=>setIsShow(true)} className={styles.input_wrapper}>
                <label className={styles.icon_wrapper} htmlFor="seacrh"><AiOutlineSearch className={styles.icon}/></label>
                <input  spellCheck="false" onChange={inputHandler} autoComplete="off" value={data}  className={styles.input} type="text" name="seacrh" id="seacrh" placeholder="Search for people, jobs, companies and more..."/>
            </div>
        </div>
    )
}

export default Search
