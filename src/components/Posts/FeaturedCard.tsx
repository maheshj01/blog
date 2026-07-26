import './FeaturedCard.css';
import styles from '../../pages/index.module.css';

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
        month: 'long',
        day: 'numeric',
    });
    return (
        <div key={props.index} className="featcard" onClick={() => { window.open(props.path, '_self'); }}>
            <div className="cardHeader">
                <h3 className={styles.gradient}>{props.title}</h3>
                <p>{props.description}</p>
            </div>
            <div className="cardButton">
                <small style={{ fontSize: '0.8rem', fontWeight: 400 }}>{formattedDate}</small>
            </div>
        </div>
    );
}
