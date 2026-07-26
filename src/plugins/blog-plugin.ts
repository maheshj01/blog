import defaultBlogPlugin from '@docusaurus/plugin-content-blog';

async function blogPluginExtended(...pluginArgs: any[]) {
    const blogPluginInstance: any = await (defaultBlogPlugin as any)(...pluginArgs);

    return {
        ...blogPluginInstance,
        // Override contentLoaded to expose recent posts to a custom home route.
        contentLoaded: async function (data: any) {
            const recentPosts = [...data.content.blogPosts].splice(0, 5);

            data.actions.addRoute({
                path: '/',
                exact: true,
                component: '@site/src/components/Home.tsx',
                modules: {
                    recentPosts: recentPosts.map((post: any) => ({
                        content: {
                            __import: true,
                            path: post.metadata.source,
                            query: { truncated: true },
                        },
                    })),
                },
            });

            return blogPluginInstance.contentLoaded(data);
        },
    };
}

export * from '@docusaurus/plugin-content-blog';
export default blogPluginExtended;
