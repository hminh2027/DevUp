import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ProjectManager from '../../components/code/ProjectManager'
import SourceCode from '../../components/code/SourceCode'

import styles from './Project.module.css'

const Code = () => {
    const dispatch = useDispatch()
    const {project} = useSelector(state=>state)

    const tabList = [
        <ProjectManager/>,
        <SourceCode/>
    ]

    const setTab = numb => dispatch({type: 'CHANGE_TAB', payload: numb})

    const checkHandler = num => {
        if(!project.project) return dispatch({type: 'ALERT', payload: {warn: 'Please select or create project'}});
        setTab(num)
    }

    return (
        <div className={styles.container}>
            <div className={styles.navigation}>
                <div onClick={()=>setTab(0)} className={`${styles.tab} ${project.tab===0 ? styles.active:''}`}>Projects manager</div>
                <div onClick={()=>checkHandler(1)} className={`${styles.tab} ${project.tab===1 ? styles.active:''}`}>Source code</div>
            </div>
            {tabList.map((tab, index)=>project.tab==index && tab)}
        </div>
    )
}

export default Code
