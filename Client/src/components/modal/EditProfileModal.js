import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {AiOutlineCamera} from 'react-icons/ai'
import {BsCardImage} from 'react-icons/bs'

import {checkImage} from '../../apis/Cloudinary'
import { updateUser } from '../../store/actions/profileAction'

import TextareaAutosize from 'react-textarea-autosize'
import Cropper from '../util/Cropper'

import styles from './EditProfileModal.module.css'

const EditProfileModal = ({setIsEdit}) => {
    const dispatch = useDispatch()

    const {auth} = useSelector(state=>state)

    const [cropImage, setCropImage] = useState(null)

    const [image, setImage] = useState({
        avatar: '',
        background: ''
    })

    const [form, setForm] = useState({
        username: auth.user.username,
        tel: auth.user.tel,
        gender: auth.user.gender,
        address: auth.user.address,
        bio: auth.user.bio,
        avatar: auth.user.avatar,
        background: auth.user.background
    })

    useEffect(()=>{
        if(form.gender === 'male') document.getElementById('gender1').checked=true;
        else if(form.gender === 'female') document.getElementById('gender2').checked=true;
        else if(form.gender === 'others') document.getElementById('gender3').checked=true;
    },[form.gender])

    const inputChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] :e.target.value
        })
    }

    const imageChangeHandler = e => {
        const file = e.target.files[0];
        const err = checkImage(file);
        if(err) return dispatch({type: 'ALERT' , payload: {error: err}});
        setImage({...image,[e.target.name]: file});
    }

    const cropImageHandler = e => {
        const file = e.target.files[0];
        const err = checkImage(file);
        if(err) return dispatch({type: 'ALERT' , payload: {error: err}});
        setCropImage(file);
    }

    const closeModal = () => {
        dispatch({type: 'MODAL', payload: false});
        setIsEdit(false);
    }

    const submitHandler = () => {
        dispatch(updateUser(auth, form, image));
        dispatch({type: 'MODAL', payload: false});
        setIsEdit(false);
    }
    
    return (
        <div className={styles.container}>
            {cropImage && <Cropper setCropImage={setCropImage} setImage={setImage} src={cropImage} />}        
            <div className={styles.heading}>Edit Profile</div>
            <div className={styles.body}>
                {/* avatar */}
                <div className={styles.section}>
                    <div className={styles.title}>Avatar</div>
                    <div className={styles.avatar_wrapper}>
                        <img src={image.avatar ? URL.createObjectURL(image.avatar) : form.avatar} alt='avatar' />
                        <div className={styles.change_avatar}>
                            Change Avatar
                            <AiOutlineCamera/>
                            <input onChange={cropImageHandler} className={styles.input_img} type="file" name="avatar" accept="image/*" />
                        </div>
                    </div>
                    
                </div>
                {/* background */}
                <div className={styles.section}>
                    <div className={styles.title}>Background</div>
                    <div style={{backgroundImage: `url('${image.background ? URL.createObjectURL(image.background) : form.background}')`}} className={styles.background_wrapper}>
                        <div className={styles.change_bg}>
                            <div className={styles.change_wrapper}>
                                Change Background
                                <BsCardImage/>
                                <input onChange={imageChangeHandler} className={styles.input_img} type="file" name="background" accept="image/*" />
                            </div>                      
                        </div>
                    </div>      
                </div>
                {/* form */}
                <div className={styles.section}>
                    <div className={styles.title}>Information</div>
                    <div className={styles.form_wrapper}>
                        <div className={styles.input_wrapper}>
                            <label htmlFor="username">Username:</label>
                            <input onChange={inputChangeHandler} id='username' className={styles.input} value={form.username} type="text" spellCheck="false" name="username" placeholder="Username..." />
                        </div>
                        <div className={styles.input_wrapper}>
                            <label htmlFor="gender">Gender:</label>
                            <div className={styles.group_radio_btn}>
                                <label className={styles.radio_label} htmlFor="gender1">Male:</label>
                                <input onChange={inputChangeHandler} id='gender1'  className={styles.input} value='male' type="radio" spellCheck="false" name="gender" />
                                <label className={styles.radio_label} htmlFor="gender2">Female:</label>
                                <input onChange={inputChangeHandler} id='gender2' className={styles.input} value='female' type="radio" spellCheck="false" name="gender" />
                                <label className={styles.radio_label} htmlFor="gender3">Others:</label>
                                <input onChange={inputChangeHandler} id='gender3' className={styles.input} value='others' type="radio" spellCheck="false" name="gender" />
                            </div>
                        </div>
                        <div className={styles.input_wrapper}>
                            <label htmlFor="tel">Phone:</label>
                            <input onChange={inputChangeHandler} id='tel' className={styles.input} value={form.tel} type="tel" spellCheck="false" name="tel" placeholder="Phone..." />
                        </div>
                        <div className={styles.input_wrapper}>
                            <label htmlFor="address">Address:</label>
                            <input onChange={inputChangeHandler} id='address' className={styles.input} value={form.address} type="text" spellCheck="false" name="address" placeholder="Address..." />
                        </div>
                        <div className={styles.textarea_wrapper}>
                            <label htmlFor="bio">Bios:</label>
                            <TextareaAutosize minRows='2' maxRows='4' value={form.bio} id='bio' name='bio' spellCheck='false' onChange={inputChangeHandler} className={styles.textarea} placeholder='Tell people something about you...' />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <div onClick={closeModal} className={`${styles.cancel} ${styles.btn}`}>Cancel</div>
                <div onClick={submitHandler} className={`${styles.submit} ${styles.btn}`}>Submit</div>
            </div>
        </div>
    )
}

export default EditProfileModal