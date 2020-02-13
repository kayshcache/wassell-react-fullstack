import React, { useState, useEffect } from 'react';
import ArticlesList from '../components/ArticlesList';
import CommentsList from '../components/CommentsList';
import ContentSection from '../components/ContentSection';
import AddCommentForm from '../components/AddCommentForm';
import NotFoundPage from './NotFoundPage';
import articleContent from './article-content';

const ArticlePage = ({ match }) => {
    const name = match.params.name;

    const [articleInfo, setArticleInfo] = useState({ name: '', title: '', upvotes: 0, comments: [], content: [] });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/articles/${name}`);
            const body = await result.json();
            setArticleInfo(body);
        }
        fetchData();
    }, [name]);
    
    const article = articleContent.find(article => article.name === name);

    if (!article) return <NotFoundPage />

    const otherArticles = articleContent.filter(article => article.name !== name);

    return (
        <>
	<ContentSection articleName={articleInfo.name} upvotes={articleInfo.upvotes} title={articleInfo.title} content={articleInfo.content} setArticleInfo={setArticleInfo} />
	<CommentsList comments={articleInfo.comments} />
        <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
        <h3>Other Articles:</h3>
        <ArticlesList articles={otherArticles} />
        </>
    );
}

export default ArticlePage;
