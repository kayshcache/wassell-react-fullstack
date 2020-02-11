import React from 'react';
//import articleContent

const ArticlePage = ({ match }) => {
	const name = match.params.name;
	return (
	<>
	<h1>This is the { name } article</h1>
	<p>Yep, it's text in a p tag</p>
	</>
	);
}

export default ArticlePage;
