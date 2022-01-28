import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {SiHtml5, SiCsswizardry, SiJavascript} from 'react-icons/si'

import Editor from './sourceCode/Editor'

import { editableProject, saveProject } from '../../store/actions/projectAction'

import styles from './SourceCode.module.css'
import CodeFrame from './sourceCode/CodeFrame'

const SourceCode = () => {
    const dispatch = useDispatch()

    const {auth, project} = useSelector(state=>state)

    const [isLoading, setIsLoading] = useState(false)
    const [isSave, setIsSave] = useState(false)
    const [isAutoSave, setAutoSave] = useState(true)

    const [html, setHtml] = useState('')
    const [css, setCss] = useState('')
    const [js, setJs] = useState('')
    const [srcDoc, setSrcDoc] = useState('')

    useEffect(() => {
        if(!project.project) return;
        setHtml(project.project.html)
        setCss(project.project.css)
        setJs(project.project.js)
        setSrcDoc(project.project.code)

    },[project.project])

    useEffect(()=>{
        if(!isSave || !project.project.isEditable) return;

        let body = {code: srcDoc, html, css, js}

        dispatch(saveProject(auth, body, project.project._id))
        setIsSave(false)

    },[isSave])

    useEffect(() => {
        if(!isAutoSave) return;
        const timeout = setTimeout(() => {
          setSrcDoc(`
            <html>
              <body>${html}</body>
              <style>${css}</style>
              <script>${js}</script>
            </html>
          `)
        }, 500)
        return () => clearTimeout(timeout)
    }, [html, css, js, isAutoSave])

    const changeEditablehandler = async () => {
        if(isLoading) return;
        setIsLoading(true)
        await dispatch(editableProject(auth, project.project._id))
        setIsLoading(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <div className={styles.infor}>
                    <div className={styles.title}>{project.project.name}</div>
                    <div className={styles.name}><Link to={`/profile/${project.project.author._id}`}>{project.project.author.username}</Link></div>
                    {project.project.isEditable ? <div style={{color: '#48bf91'}} className={styles.editable}>(Editable)</div> : <div style={{color: '#ff4242'}} className={styles.editable}>(Non-Editable)</div>}
                </div>
                <div className={styles.group_btn}>
                    {project.project.author._id===auth.user._id && 
                    (<div onClick={changeEditablehandler} className={styles.btn_wrapper}>
                        Editable: {project.project.isEditable?'On':'Off'}
                    </div>)}
                    <div style={{cursor: `${project.project.isEditable?'pointer':'not-allowed'}`}} onClick={()=>setIsSave(true)} className={styles.btn_wrapper}>Save Online</div>
                    <div onClick={()=>setAutoSave(!isAutoSave)} className={`${styles.btn_wrapper} ${isAutoSave?styles.autosave:''}`}>Autosave</div>
                </div>
            </div>
            <div className={styles.editors}>
                <Editor
                language="xml"
                name="HTML"
                value={html}
                onChange={setHtml}
                labelColor='#d94924'
                icon={<SiHtml5 />}
                />
                
                <Editor
                language="css"
                name="CSS"
                value={css}
                onChange={setCss}
                labelColor='#5bb7ed'
                icon={<SiCsswizardry/>}
                />

                <Editor
                language="javascript"
                name="JS"
                value={js}
                onChange={setJs}
                labelColor='#e4d04b'
                icon={<SiJavascript/>}
                />
            </div>
            <CodeFrame srcDoc={srcDoc} />
        </div>
    )
}

export default SourceCode