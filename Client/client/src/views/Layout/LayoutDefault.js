import React from 'react'
import { Route } from 'react-router'
import { useMediaQuery } from 'react-responsive'

import Header from '../../components/header/Header'
import NavList from '../../components/home/left-side/NavList'

import styles from './LayoutDefault.module.css'

const LayoutDefault = (props) => {
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })

  return (
  <>
    <Header/>
    <div className={styles.container}>
        {isDesktop && <div className={styles.leftside}>
            <NavList/>
        </div> }
        <div className={styles.middle}>
                <Route {...props} />
        </div>
    </div>
  </>
  )}

export default LayoutDefault
