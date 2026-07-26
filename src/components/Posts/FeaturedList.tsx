import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import FeaturedCard from './FeaturedCard';
import './FeaturedList.css';
import Headline from './Headline';

interface Post {
    slug: string;
    title: string;
    description?: string;
    created_at: string;
    tags?: string[];
    featured?: boolean;
}

export default function FeaturedList(_props: { allPosts?: unknown }) {
    const { siteConfig } = useDocusaurusContext();
    const localPosts = (((siteConfig.customFields as any)?.allPosts) ?? []) as Post[];
    const featured = localPosts.filter((post) => post.featured === true);
    if (featured.length === 0) {
        return <></>;
    }
    return (
        <div className="featuredContainer">
            <Headline title="Featured" size="large" />
            {featured.map((post, index) => (
                <div key={index}>
                    <FeaturedCard
                        index={index}
                        tags={post.tags}
                        title={`${post.title}`}
                        description={post.description}
                        path={`/blog/${post.slug}`}
                        date={post.created_at}
                    />
                </div>
            ))}
        </div>
    );
}
