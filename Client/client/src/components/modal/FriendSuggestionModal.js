import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSuggestion } from '../../store/actions/suggestionAction';
import Card from '../util/Card';

import styles from './FriendSuggestionModal.module.css'

const FriendSuggestionModal = () => {
    const dispatch = useDispatch()

    const {suggestion, auth} = useSelector(state=>state)
    const [page, setPage] = useState(1)

    useEffect(()=>{
        dispatch(getSuggestion(auth, page))
    },[auth, dispatch, page])

    const reloadSuggestion = () => {
        !suggestion.isEnd ? setPage(page+1) : dispatch({type: 'ALERT', payload: {warn: 'No new suggestions!'}})
    }

    return (
        <Card width='100%' mg='2rem 0'>
            <div className="heading">
                <div className="title">Suggestion</div>
                <div className="icon_wrapper">?</div>
            </div>
            <div className="body">

            </div>
        </Card>
    )
}

export default FriendSuggestionModal
