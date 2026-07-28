import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import FeaturedCard from './FeaturedCard';
import './FeaturedList.css';
import Reveal from '../common/Reveal';

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
        <section className="home-section">
            <div className="section-head">
                <h2 className="section-title">Featured</h2>
                <span className="section-rule" aria-hidden="true" />
                <span className="section-count">{featured.length}</span>
            </div>
            <div className="feat-grid">
                {featured.map((post, index) => (
                    <Reveal key={post.slug} delay={index * 70}>
                        <FeaturedCard
                            index={index}
                            tags={post.tags}
                            title={`${post.title}`}
                            description={post.description}
                            path={`/blog/${post.slug}`}
                            date={post.created_at}
                        />
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
