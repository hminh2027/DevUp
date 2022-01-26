import React from 'react';
import styles from './Loading.module.css';

const Loading = () => {
    
    return (
        <>
        <div className={styles.black_bg}></div>
        <div className={styles.load_spinner_wrapper}>
            <div className={styles.load_spinner}>
                <div ></div>
                <div>
                    <div></div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Loading;
