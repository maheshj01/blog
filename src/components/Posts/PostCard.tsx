import React from 'react';
import './PostCard.css';

interface PostCardProps {
    date: string;
    path: string;
    title: string;
    index?: number;
    tags?: string[];
    description?: string;
    className?: string;
}

function PostCard(props: PostCardProps) {
    const formattedDate = new Date(props.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    return (
        <div className="postcard" onClick={() => { window.open(props.path, '_blank'); }}>
            <p className="postdate">{formattedDate}</p>
            <div style={{ width: '20px' }}></div>
            <p className="title">{props.title}</p>
        </div>
    );
}

export default PostCard;
