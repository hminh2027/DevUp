import React, { useEffect,useState } from 'react'
import ReactDOM from 'react-dom'
import {useSelector} from 'react-redux'

import { ToastContainer, toast } from 'react-toastify'
import {Toast} from './Toast'
import Loading from './Loading'
toast.configure()

function Alert() {
    const {alert} = useSelector(state => state)
    const portal = document.getElementById('portal')

    const [alertType, setAlertType] = useState({
        loading: false,
        success: '',
        error: '',
        warn: ''
    })

    useEffect(()=>{
        if(alert == alertType){
            setAlertType({
                ...alertType,
                success: '',
                error: '',
                warn: ''
            })
        }
        
    },[alertType])

    useEffect(()=>{
        setAlertType(alert)
    },[alert])
    
    return (
        <>
            {alertType.loading && ReactDOM.createPortal(<Loading/>, portal)}      
            {alertType.success &&  <Toast type="success" body={alertType.success} />}
            {alertType.error &&  <Toast type="error" body={alertType.error} />}
            {alertType.warn &&  <Toast color='black' type="warn" body={alertType.warn} />}
            <Toast/>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}


export default Alert
