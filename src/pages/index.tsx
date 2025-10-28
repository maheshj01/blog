import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import "../components/Posts/posts.module.css";
import BlogList from "../components/Posts/BlogList";
import MainContent from "../components/common/MainContent";
import Constants from "./constants";

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return <>
        <Layout>
            <MainContent title={Constants.About} description={Constants.AboutDescription} />
            <BlogList />
        </Layout>
    </>
}


