import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import {MdFormatQuote, MdPhotoCamera, MdRemoveCircle} from 'react-icons/md'
import {RiShareBoxLine} from 'react-icons/ri'
import {IoFilmSharp} from 'react-icons/io5'

import Card from '../util/Card'
import TextareaAutosize from 'react-textarea-autosize'

import {createPost} from '../../store/actions/postAction'
import { addMedia } from '../util/Media'

import styles from './Status.module.css'

const Status = () => {
    const dispatch = useDispatch()

    const {auth, socket} = useSelector(state=>state)

    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isTablet = useMediaQuery({ query: '(min-device-width : 768px) and (max-device-width: 1224px)' })

    const [form,setForm] = useState({
        text: '',
        files: []
    })

    useEffect(()=>{
        if(!form.text.trim()) document.getElementById("submit").disabled = true
        else document.getElementById("submit").disabled = false
        
    },[form.text])

    const addAttachHandler = e => {
        const files = [...e.target.files]
        const rs = addMedia(form.files, files)
        if(rs.error) return dispatch({ type: 'ALERT', payload: {error: rs.error} })
        setForm({...form, files: rs.success})
        e.target.value=null
    }
    
    const removeAttachmentHandler = () => {
        setForm({...form, files: []})
    }

    const submitHandler = e => {
        e.preventDefault()

        if(!form.text) return
        if(auth.token && form.text){
            dispatch(createPost(form, auth, socket))
            setForm({text: '', files: []})
        }
    }
    return (
        <div className={styles.container}>
            <ul className={styles.list_items}>
                <li className={styles.item}>
                    <div style={{backgroundColor: '#EBB35E'}} className={styles.icon_wrapper}>
                        <MdFormatQuote />
                    </div>
                    <div className={styles.text}>{`Write ${isDesktop||isTablet ? 'a quote':''}`}</div>
                </li>
                <li className={styles.item}>   
                    <div style={{backgroundColor: '#7BCDD2'}} className={styles.icon_wrapper}>
                        <RiShareBoxLine />
                    </div>                  
                    <div className={styles.text}>{`Share ${isDesktop||isTablet ? 'a post':''}`}</div>
                </li>
                <li className={styles.item}>
                    <div style={{backgroundColor: '#D498E9'}} className={styles.icon_wrapper}>
                        <MdPhotoCamera />
                    </div>   
                    <div className={styles.text}>{`Upload ${isDesktop||isTablet ? 'a photo':''}`}</div>
                </li>
            </ul>
            <Card width='100%'>
                <form onSubmit={submitHandler} action="" method="post" className={styles.form}>
                    <TextareaAutosize minRows='3' maxRows='9' value={form.text} spellCheck='false' type='text' name='text' onChange={e=>setForm({...form,text: e.target.value})} className={styles.textarea} placeholder="What's on your mind?" />
                    <div className={styles.media_list} >
                        {form.files && (form.files.map((file,index) =>
                            (
                                <div key={index} className={styles.media_wrapper}>
                                    {
                                        file.type.match(/video/i)
                                        ? <video className={styles.media} controls src={URL.createObjectURL(file)} alt="video" />
                                        : <img className={styles.media} src={URL.createObjectURL(file)} alt="image" />
                                    }
                                </div>
                            ))
                        )}
                        <div onClick={removeAttachmentHandler} className={styles.remove_btn}><MdRemoveCircle /></div>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.btn_group}>
                            <div className={styles.video}>
                                <input onChange={addAttachHandler} multiple accept="video/*" className={styles.file_input} type="file" name="video" id="video" />
                                <label className={styles.label} htmlFor="video"><IoFilmSharp/></label>
                                </div>
                            <div className={styles.image}>
                                <input onChange={addAttachHandler} multiple accept="image/*" className={styles.file_input} type="file" name="image" id="image" />
                                <label className={styles.label} htmlFor="image"><MdPhotoCamera/></label>
                            </div>
                        </div>                            
                        <button id='submit' className={styles.submit} type="submit">POST</button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default Status