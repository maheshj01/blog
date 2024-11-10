import './FeaturedCard.css';
import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from '../../pages/index.module.css';

export default function FeaturedCard(props) {
    const date = new Date(props.date);
    date.setUTCHours(0, 0, 0, 0);
    const formattedDate = new Date(props.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    // const {colorMode, setColorMode} = useColorMode();
    // const dark = colorMode === 'dark';
    return <div key={props.index}
        // style={{
        //     boxShadow: `0 0 10px ${dark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'
        //         }`
        // }}
        className='featcard' onClick={() => {
            window.open(props.path, "_self")
        }}>
        <div className="cardHeader">
            <h3 className={styles.gradient}>{props.title}</h3>
            <p>{props.description}</p>
        </div>
        <div className="cardButton">
            <small
                style={{
                    fontSize: '0.8rem',
                    fontWeight: 'weight: 400',
                }}
            >{formattedDate}</small>
        </div>
    </div>

}

