import Layout from "@theme/Layout";
import BlogList from "../components/Posts/BlogList";
import MainContent from "../components/common/MainContent";

export default function Home() {
    return (
        <Layout>
            <main>
                <MainContent title="" />
                <BlogList />
            </main>
        </Layout>
    );
}
