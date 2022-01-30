import React from 'react'
import {Link} from 'react-router-dom'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import styles from './PostContent.module.css'

const PostContent = ({post}) => {
  // Config carousel
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      }

    return (
        <Carousel 
            removeArrowOnDeviceType={["tablet", "mobile"]} 
            dotListClass="custom-dot-list-style" 
            draggable={false}  
            swipeable={true}
            responsive={responsive}
            itemClass={styles.carousel_item}
            className={styles.carousel_container}>
                {post.media.map((file,index)=>(
                    <Link key={index} style={{width: '100%'}} to={`/post/${post._id}`}>
                      <div className={styles.image_wrapper}>
                        {
                          file.url.match(/video/i)
                          ? <video controls  src={file.url} alt="video" />
                          : <img className={styles.image} src={file.url} alt="image" />
                        }
                      </div>      
                    </Link>
                ))}
        </Carousel>
    )
}

export default PostContent
