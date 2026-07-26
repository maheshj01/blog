import React from 'react';
import './Headline.css';

interface HeadlineProps {
    title: string;
    size?: string;
}

function Headline({ title, size }: HeadlineProps) {
    return <p className={size}>{title} </p>;
}

export default Headline;
