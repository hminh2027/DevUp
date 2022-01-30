import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PageNotFound from '../../views/PageNotFound/PageNotFound'

export const PageRender = () => {
    const {page} = useParams()
    const {auth} = useSelector(state=>state)

    let pageName = ''
    if(auth.token) pageName = `${page}`

    return (
        generatePage(pageName)  
    )
}

const generatePage = (pageName) => {
    const page = pageName.charAt(0).toUpperCase() + pageName.slice(1)
    const  component = () => require(`../../views/${page}/${page}`).default

    try {
        return React.createElement(component())

    } catch (err) {
        return <PageNotFound/>
    }
}
