import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getResSuggestion } from '../../../store/actions/suggestionAction'
import FriendCard from '../../profile/Tab/FriendCard'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import {MdPeopleOutline} from 'react-icons/md'
import {RiCloseLine} from 'react-icons/ri'

import styles from './ResponsiveFriendSuggestion.module.css'
import Card from '../../util/Card'
import { Link } from 'react-router-dom'

const ResponsiveFriendSuggestion = ({setShowSuggestion}) => {
    const dispatch = useDispatch()
    
    const {suggestion, auth} = useSelector(state=>state)


    useEffect(()=>{
        dispatch(getResSuggestion(auth))

    },[auth.user._id, dispatch])

    const responsive = {
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      }


    return (
        <Card width='100%' height='auto' bg='white' mg='2rem 0'>
          <div className={styles.heading}>
            <div className={styles.title}>People you may know</div>
              <div onClick={()=>setShowSuggestion(false)} className={styles.close_icon_wrapper}><RiCloseLine/></div>
            </div>
            {!suggestion.loading && <Carousel
            arrows={true}
            draggable={false}  
            swipeable={true}
            responsive={responsive}
            itemClass={styles.carousel_item}
            className={styles.carousel_container}>
                {suggestion.users.map((user,index)=>(
                  <div className={styles.item}>
                    <FriendCard key={index} user={user} />
                  </div>
                ))}
                <div className={styles.item}>
                  <div className={styles.content}>
                    <div className={styles.people_icon_wrapper}><MdPeopleOutline/></div>
                    <div className={styles.text}>Wanna connect to more people?</div>
                    <Link to='/people' className={styles.people_btn}>Go to People Page</Link>
                  </div>           
                </div>
            </Carousel>}
        </Card>
    )}

export default ResponsiveFriendSuggestion
