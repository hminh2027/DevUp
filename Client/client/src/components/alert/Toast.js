import React from 'react'
import {  toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

export const Toast = (props) => {
    const config = {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    if(props.type == 'success') {
        toast.success(`✅ ${props.body.replace(/(\")+/g , '')}`, config)
    }
    else if(props.type == 'error') {
        toast.error(`❌ ${props.body.replace(/(\")+/g , '')}`, config)
    }
    else if(props.type == 'warn') {
        toast.warn(`⚠️ ${props.body.replace(/(\")+/g , '')}`, config)
    }

    return (
        <></>
    )
}
