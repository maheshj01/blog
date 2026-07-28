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
        month: 'short',
        day: '2-digit',
    });
    return (
        <a className="post-row" href={props.path}>
            <span className="post-row__node" aria-hidden="true" />
            <time className="post-row__date">{formattedDate}</time>
            <span className="post-row__body">
                <span className="post-row__title">{props.title}</span>
                {props.tags && props.tags.length > 0 && (
                    <span className="post-row__tags">
                        {props.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="post-row__tag">
                                {tag}
                            </span>
                        ))}
                    </span>
                )}
            </span>
        </a>
    );
}

export default PostCard;
