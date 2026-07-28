import './FeaturedCard.css';
import { Icon } from '@iconify/react';

interface FeaturedCardProps {
    index?: number;
    title: string;
    description?: string;
    path: string;
    date: string;
    tags?: string[];
}

export default function FeaturedCard(props: FeaturedCardProps) {
    const formattedDate = new Date(props.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
    });
    return (
        <a className="feat-card" href={props.path}>
            <div className="feat-card__top">
                <span className="feat-card__date">{formattedDate}</span>
                <Icon
                    className="feat-card__arrow"
                    icon="lucide:arrow-up-right"
                    width="18"
                    height="18"
                    aria-hidden="true"
                />
            </div>
            <h3 className="feat-card__title">{props.title}</h3>
            {props.description && (
                <p className="feat-card__desc">{props.description}</p>
            )}
            {props.tags && props.tags.length > 0 && (
                <div className="feat-card__tags">
                    {props.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="feat-card__tag">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </a>
    );
}
