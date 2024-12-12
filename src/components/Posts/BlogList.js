import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React, { useEffect, useState } from 'react';
import FeaturedList from './FeaturedList';
import Headline from './Headline';
import PostCard from './PostCard';
import styles from './posts.module.css';

export const BlogList = (props) => {
    const { siteConfig } = useDocusaurusContext();
    //  make a api call to get all posts
    const [allPosts, setPosts] = useState([])
    const [tags, setTags] = useState(['All'])
    const [selectedTag, setSelected] = useState(() => {
        return 'All'
    })
    const fetchPosts = async (tag) => {
        const feeds = await fetch('https://blog.maheshjamdade.com/blog/feed.json');
        // var localPosts = siteConfig.customFields.allPosts;
        feeds.json().then(data => {
            if (tag === 'All') {
                setPosts(data.items);
            } else {
                setPosts(data.items.filter(post => post.tags.includes(tag)));
            }
        });
    };
    useEffect(() => {
        var localPosts = siteConfig.customFields.allPosts;
        console.log(localPosts.length)
        localPosts.forEach((post) => {
            if (post.tags) {
                post.tags.forEach((tag) => {
                    if (!tags.includes(tag)) {
                        tags.push(tag);
                    }
                })
            }
        });
        fetchPosts(selectedTag)
    }, []);

    return <div className={`${styles.blogList} `}>
        <FeaturedList allPosts={allPosts} />
        <div style={{ height: '30px' }}></div>
        <div style={
            {
                display: 'flex',
                alignItems: 'center',
            }
        }>
            <div className={styles.filterContainer}>
                <Headline title="All Posts" size="large" />
                <div style={{ width: '20px' }}></div>
                <Tags
                    selectedTag={selectedTag}
                    tags={tags} onTagClick={(x) => {
                        setSelected(x)
                        fetchPosts(x)
                    }} />
            </div>
        </div>
        <div className={`${styles.blogList} `}>
            {allPosts.map((post, index) => {
                // if consecutive posts have same year, don't show year
                var oldDate = new Date(post.date_modified)
                const date = new Date(post.date_modified);
                if (index != 0) {
                    oldDate = new Date(allPosts[index - 1].date_modified);
                }
                const yearEqual = oldDate.getFullYear() === date.getFullYear()
                if (yearEqual && index != 0) {
                    return <div key={index}>
                        <PostCard
                            index={index}
                            tags={post.tags}
                            title={`${post.title}`}
                            description={post.description}
                            path={post.url}
                            date={post.date_modified}
                        />
                    </div>
                } else {
                    return <div key={index}>
                        <div style={{ height: '30px' }}></div>
                        <h2>{date.getFullYear()}</h2>
                        <PostCard
                            index={index}
                            className={`card ${index}`}
                            tags={post.tags}
                            title={`${post.title}`}
                            description={post.description}
                            path={post.url}
                            date={post.date_modified}
                        />
                    </div>
                }

            })
            }
        </div>
    </div>
}

export default BlogList;


export function Tags(props) {
    const handleTagClick = (tag) => {
        props.onTagClick(tag);
    };
    return (
        <div className={styles.tagsContainer}>
            {
                props.tags.map((tag) => (
                    <div className={`${styles.tag} `} style={{
                        border: props.selectedTag === tag ? '2px solid var(--ifm-color-primary)' : '1px solid var(--ifm-color-primary)',
                        background: props.selectedTag === tag ? 'var(--ifm-color-primary)' : null,
                    }}>
                        <a
                            style={{
                                color: props.selectedTag === tag ? 'white' : 'var(--ifm-color-primary)',
                            }}
                            onClick={() => handleTagClick(tag)}>{tag}</a>
                    </div>
                ))
            }
        </div >
    );
}
