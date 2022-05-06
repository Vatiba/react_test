const http = require('http');
const url = require('url');
// I had to install pg library to interact with postgresql database
const { Client } = require('pg');
const getData = require('./utils');
const client = new Client({
	user: "postgres",
	host: "localhost",
	database: "test",
	password: "1234",
	port: 5432,
});

client.connect().then(() => {
	http.createServer((req, res) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Content-Type', 'application/json');


		const parsedUrl = url.parse(req.url, true);
		const queryParams = parsedUrl.query;

		if (req.method === 'GET' && parsedUrl.pathname === '/table') {
			let limit = queryParams?.limit || undefined;
			let offset = queryParams?.offset || undefined;
			let columnName = queryParams?.columnName;
			let condition = queryParams?.condition;
			let field = queryParams?.field;

			console.log(limit,
				offset,
				columnName,
				condition,
				field);
			getData(limit, offset, columnName, condition, field, client).then(response => {
				res.end(JSON.stringify(response));
			}).catch(err => {
				console.error(err);
			}).finally(() => {
				res.end();
			})
		} else {
			res.end('404 not found');
		}
	}).listen(3001);
}
).catch(err => {
	console.error(err);
});