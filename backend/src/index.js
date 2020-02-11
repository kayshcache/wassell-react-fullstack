import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config()
const MONGO = process.env.MONGO;

const app = express();

app.use(express.json());

app.get('/api/articles', (req, res) => res.send(req.body));

app.get('/api/articles/:name', async (req, res) => {
	withDb(async (db) => {
		const articleName = req.params.name;
		const articleInfo = await db.collection('articles')
			.findOne({ name: articleName });
		res.status(200).json(articleInfo);
	}, res);
});

app.post('/api/articles/:name/upvote', async (req, res) => {
	withDb(async (db) => {
		const articleName = req.params.name;
		const articleInfo = await db.collection('articles')
			.findOne({ name: articleName });
		await db.collection('articles').updateOne({ name: articleName }, {
			'$set': {
				upvotes: articleInfo.upvotes + 1,
			},
		});
		const updatedArticleInfo =  await db.collection('articles')
			.findOne({ name: articleName });
		res.status(200).json(updatedArticleInfo);
	}, res);
});

app.post('/api/articles/:name/add-comment', (req, res) => {
	const { username, text } = req.body;
	withDb(async (db) => {
		const articleName = req.params.name;
		const articleInfo = await db.collection('articles')
			.findOne({ name: articleName });
		await db.collection('articles').updateOne({ name: articleName }, {
			'$set': {
				comments: articleInfo.comments.concat({
					username, text
				}),
			},
		});
		const updatedArticleInfo =  await db.collection('articles')
			.findOne({ name: articleName });
		res.status(200).json(updatedArticleInfo);
	}, res);
});

app.listen(8000, () => console.log('Backend on port 8000'));

async function withDb(operations, res) {
	try {
		const client = await MongoClient.connect(MONGO, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		const db = client.db('blog');

		// Is an anonymous function passed in
		await operations(db);

		client.close();
	} catch (err) {
		res.status(500).json({ message: err });
	}
}
