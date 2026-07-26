import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import FeaturedList from './FeaturedList';
import Headline from './Headline';
import PostCard from './PostCard';
import Reveal from '../common/Reveal';
import styles from './posts.module.css';
import { useEffect, useState } from 'react';

interface FeedItem {
    url: string;
    tags?: string[];
    title: string;
    description?: string;
    date_modified: string;
}

interface TagsProps {
    tags: string[];
    selectedTag: string;
    onTagClick: (tag: string) => void;
}

export const BlogList = (_props: Record<string, unknown>) => {
    const { siteConfig } = useDocusaurusContext();
    const [allPosts, setPosts] = useState<FeedItem[]>([]);
    const [tags, setTags] = useState<string[]>(['All']);
    const [selectedTag, setSelected] = useState<string>('All');

    const fetchPosts = async (tag: string) => {
        try {
            const res = await fetch('/blog/feed.json');
            if (res.ok) {
                const data = await res.json();
                const items: FeedItem[] = Array.isArray(data.items) ? data.items : [];
                if (items.length > 0) {
                    if (tag === 'All') {
                        setPosts(items);
                    } else {
                        setPosts(items.filter((post) => Array.isArray(post.tags) && post.tags.includes(tag)));
                    }
                    return;
                }
            }
        } catch (e) {
            // ignore and fall back to local site config posts
        }
        const localPosts = (((siteConfig.customFields as any)?.allPosts) ?? []) as any[];
        const mapped: FeedItem[] = localPosts.map((p) => ({
            url: `/blog/${p.slug}`,
            tags: p.tags || [],
            title: p.title,
            description: p.description,
            date_modified: p.created_at,
        }));
        if (tag === 'All') {
            setPosts(mapped);
        } else {
            setPosts(mapped.filter((post) => Array.isArray(post.tags) && post.tags.includes(tag)));
        }
    };

    useEffect(() => {
        const localPosts = (((siteConfig.customFields as any)?.allPosts) ?? []) as any[];
        const collected = [...tags];
        localPosts.forEach((post) => {
            if (post.tags) {
                post.tags.forEach((tag: string) => {
                    if (!collected.includes(tag)) {
                        collected.push(tag);
                    }
                });
            }
        });
        setTags(collected);
        fetchPosts(selectedTag);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={`${styles.blogList} `}>
            <FeaturedList allPosts={allPosts} />
            <div style={{ height: '30px' }}></div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className={styles.filterContainer}>
                    <Headline title="All Posts" size="large" />
                    <div style={{ width: '20px' }}></div>
                    <Tags
                        selectedTag={selectedTag}
                        tags={tags}
                        onTagClick={(x) => {
                            setSelected(x);
                            fetchPosts(x);
                        }}
                    />
                </div>
            </div>
            <div className={`${styles.blogList} `}>
                {allPosts.map((post, index) => {
                    const date = new Date(post.date_modified);
                    let oldDate = date;
                    if (index !== 0) {
                        oldDate = new Date(allPosts[index - 1].date_modified);
                    }
                    const yearEqual = oldDate.getFullYear() === date.getFullYear();
                    const delay = (index % 6) * 70;
                    if (yearEqual && index !== 0) {
                        return (
                            <Reveal key={`${selectedTag}-${index}`} delay={delay}>
                                <PostCard index={index} tags={post.tags} title={`${post.title}`} description={post.description} path={post.url} date={post.date_modified} />
                            </Reveal>
                        );
                    }
                    return (
                        <Reveal key={`${selectedTag}-${index}`} delay={delay}>
                            <div style={{ height: '30px' }}></div>
                            <h2>{date.getFullYear()}</h2>
                            <PostCard index={index} className={`card ${index}`} tags={post.tags} title={`${post.title}`} description={post.description} path={post.url} date={post.date_modified} />
                        </Reveal>
                    );
                })}
            </div>
        </div>
    );
};

export default BlogList;

export function Tags(props: TagsProps) {
    const handleTagClick = (tag: string) => {
        props.onTagClick(tag);
    };
    return (
        <div className={styles.tagsContainer}>
            {props.tags.map((tag) => (
                <div
                    key={tag}
                    className={`${styles.tag} `}
                    style={{
                        border: props.selectedTag === tag ? '2px solid var(--ifm-color-primary)' : '1px solid var(--ifm-color-primary)',
                        background: props.selectedTag === tag ? 'var(--ifm-color-primary)' : undefined,
                    }}
                >
                    <a
                        style={{ color: props.selectedTag === tag ? 'white' : 'var(--ifm-color-primary)' }}
                        onClick={() => handleTagClick(tag)}
                    >
                        {tag}
                    </a>
                </div>
            ))}
        </div>
    );
}
