import React from 'react'

import { motion, AnimatePresence } from "framer-motion"
import OutsideClick from './OutsideClick'

import styles from './DropdownCard.module.css'

const DropdownCard = (props) => {
  const variants = {
    initial: {
        maxHeight: 0,
    },
    enter: {
      maxHeight: '800px',
      transition: {
        duration: .6,
        when: "beforeChildren",
      },
    },
    exit: {
      maxHeight: 0,
      opacity: 0,
      transition: { duration: 0.3 },
    }
  }

  return (
    <OutsideClick state={props.isShow} setState={props.setIsShow}>
    <AnimatePresence >
        {props.isShow && 
        <motion.div
        variants ={variants}
        key="dropdown"
        initial='initial'
        animate='enter'
        exit='exit'
        style={{top: props.top, right: props.right, width: props.width, padding: props.padding}}
        className={styles.container}
        >
          {props.children}
        </motion.div>
        }
    </AnimatePresence>
    </OutsideClick>
  )
}

export default DropdownCard
