import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAPI } from '../../apis/Axios'
import { useMediaQuery } from 'react-responsive'
import InfiniteScroll from 'react-infinite-scroll-component'

const InfiniteList = ({list, elem, id, children, api, action}) => {
    const dispatch = useDispatch()
    const {auth} = useSelector(state=>state)

    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })

    const [page, setPage] = useState(1)
    const [load, setLoad] = useState(false)

    const getData = () => {
        setPage(page+1)
        setLoad(true)
    }

    useEffect(async ()=>{
        if(load) {
            let res
            id ? 
            res = await getAPI(`${api}/${id}?page=${page}`, auth.token)
            :
            res = await getAPI(`${api}?page=${page}`, auth.token)
            setLoad(false)
            if(res.data.result.length===0) return
            dispatch({type: `${action}`, payload: res.data.result})
        }
    },[load])

    return (
        <InfiniteScroll
            dataLength={list.length}
            next={getData}
            hasMore={true}
            scrollableTarget={elem}
            style={isDesktop ? {padding: '0 1rem', margin: '0 -1rem', overflow: 'unset'} : {}}
        >
            {children}
        </InfiniteScroll>  
    )
}

export default InfiniteList
