import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import FeaturedList from './FeaturedList';
import PostCard from './PostCard';
import Reveal from '../common/Reveal';
import './blog-list.css';
import { useEffect, useState, type ReactNode } from 'react';

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

    // Sort newest-first so each year forms one contiguous block. The source
    // data isn't guaranteed to be chronological, and rendering it unsorted
    // produces duplicate/out-of-order year markers.
    const sortedPosts = [...allPosts].sort(
        (a, b) => new Date(b.date_modified).getTime() - new Date(a.date_modified).getTime()
    );

    // Build the changelog timeline: one year marker precedes the first post of each year.
    const rows: ReactNode[] = [];
    let lastYear: number | null = null;
    sortedPosts.forEach((post, index) => {
        const year = new Date(post.date_modified).getFullYear();
        if (year !== lastYear) {
            lastYear = year;
            rows.push(
                <div className="year-marker" key={`year-${year}`}>
                    <span className="year-marker__node" aria-hidden="true" />
                    {year}
                </div>
            );
        }
        const delay = (index % 6) * 55;
        rows.push(
            <Reveal key={`post-${post.url}`} delay={delay}>
                <PostCard
                    index={index}
                    tags={post.tags}
                    title={`${post.title}`}
                    description={post.description}
                    path={post.url}
                    date={post.date_modified}
                />
            </Reveal>
        );
    });

    return (
        <>
            <FeaturedList allPosts={allPosts} />
            <section className="home-section all-posts">
                <div className="section-head">
                    <h2 className="section-title">All posts</h2>
                    <span className="section-rule" aria-hidden="true" />
                    <span className="section-count">{allPosts.length}</span>
                </div>
                <Tags
                    selectedTag={selectedTag}
                    tags={tags}
                    onTagClick={(x) => {
                        setSelected(x);
                        fetchPosts(x);
                    }}
                />
                {allPosts.length === 0 ? (
                    <p className="posts-empty">No posts here yet — try another tag.</p>
                ) : (
                    <div className="post-timeline" key={selectedTag}>{rows}</div>
                )}
            </section>
        </>
    );
};

export default BlogList;

export function Tags(props: TagsProps) {
    return (
        <div className="tag-filter" role="group" aria-label="Filter posts by tag">
            {props.tags.map((tag) => {
                const active = props.selectedTag === tag;
                return (
                    <button
                        key={tag}
                        type="button"
                        className={`tag-chip${active ? ' is-active' : ''}`}
                        aria-pressed={active}
                        onClick={() => props.onTagClick(tag)}
                    >
                        {tag}
                    </button>
                );
            })}
        </div>
    );
}
