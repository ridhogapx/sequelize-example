import { BookAuthenticate, BookSync, retrieveData } from './models/BookModel';

const express:any = require('express');

const app: any = express();

const port: number = 5000;

interface ResponseMessage {
	message: string,
	success: boolean,
	status: number,
}

BookAuthenticate();
BookSync();


app.get('/', (req: any, res:any):void => {
	let responseAPI: ResponseMessage = {
		message: 'Hello world!',
		success: true,
		status: 200
	}

	res.end(JSON.stringify(responseAPI));
});

app.get('/books', retrieveData)


app.listen(port, (): void => {
	console.log(`Server is running on port ${port}`);
});