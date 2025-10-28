import styles from "../../pages/index.module.css";
import Constants from "../../pages/constants";
import Button from "./Button";

interface HomepageHeaderProps {
    title: string;
    description: string;
}

export default function MainContent({ title, description }:

    HomepageHeaderProps) {
    return (
        <header className={`${styles.heroBanner}`}>
            <p className="text-2xl font-medium">{title}</p>
            <p className="text-2xl font-medium ">{description}</p>
            <div className={`${styles.buttons}`}>
                <Button
                    onClick={() => {
                        window.open(Constants.PORTFOLIO_URL, "_blank")
                    }}>{Constants.AboutMe}</Button>
                <div style={{ width: 20 }}></div>
                <Button
                    onClick={() => {
                        window.open(Constants.TWITTER_URL, "_blank")
                    }}
                    className={styles.button}>Twitter</Button>
            </div>
        </header >
    );
}


