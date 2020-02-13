import React from 'react';
import UpvotesSection from './UpvotesSection';

const ContentSection = ({ articleName, title, upvotes, content, setArticleInfo }) => {
    return (
        <div id="content-section">
	<h1>{ title }</h1>

        <UpvotesSection articleName={articleName} upvotes={upvotes} setArticleInfo={setArticleInfo} />
	<p>{ content[0] }</p>
	{content.map((paragraph, key) => (
            <p key={key}>{paragraph}</p>
        ))}

        </div>
    );
}

export default ContentSection;
