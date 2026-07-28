import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "../../pages/index.module.css";
import Constants from "../../constants";
import { Icon } from "@iconify/react";

interface HomepageHeaderProps {
    title: string;
    description?: string;
}

interface PostMeta {
    created_at?: string;
}

export default function MainContent(_props: HomepageHeaderProps) {
    const { siteConfig } = useDocusaurusContext();
    const posts = (((siteConfig.customFields as any)?.allPosts) ?? []) as PostMeta[];

    const years = posts
        .map((p) => (p.created_at ? new Date(p.created_at).getFullYear() : null))
        .filter((y): y is number => Number.isFinite(y as number));
    const firstYear = years.length ? Math.min(...years) : undefined;
    const lastYear = years.length ? Math.max(...years) : undefined;
    const postCount = posts.length;

    return (
        <header className={styles.hero}>
            <div className={styles.heroInner}>
                <p className={styles.heroKicker}>
                    <span className={styles.heroDot} aria-hidden="true" />
                    {Constants.HeroKicker}
                    {firstYear ? ` · est. ${firstYear}` : ""}
                </p>

                <h1 className={styles.heroHeadline}>{Constants.HeroHeadline}</h1>

                <p className={styles.heroIntro}>{Constants.HeroIntro}</p>

                <div className={styles.heroActions}>
                    <a
                        className={styles.heroPrimary}
                        href={Constants.PORTFOLIO_URL}
                        target="_blank"
                        rel="noreferrer"
                    >
                        About me
                        <Icon icon="lucide:arrow-up-right" width="18" height="18" />
                    </a>
                    <a
                        className={styles.heroLink}
                        href={Constants.TWITTER_URL}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Icon icon="ri:twitter-x-fill" width="16" height="16" />
                        Twitter
                    </a>
                    <a
                        className={styles.heroLink}
                        href={Constants.GITHUB_URL}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Icon icon="mdi:github" width="17" height="17" />
                        GitHub
                    </a>
                </div>

                {postCount > 0 && (
                    <p className={styles.heroMeta}>
                        <span>{postCount} posts</span>
                        <span className={styles.heroMetaSep} aria-hidden="true">/</span>
                        <span>{firstYear}&ndash;{lastYear}</span>
                        <span className={styles.heroMetaSep} aria-hidden="true">/</span>
                        <span>Flutter · software · life</span>
                    </p>
                )}
            </div>
        </header>
    );
}
