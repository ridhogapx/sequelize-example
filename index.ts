const express:any = require('express');
const {Sequelize: orm, DataTypes: Types } = require('sequelize');



const app: any = express();

const initiate: any = new orm(
	'sequelize',
	'root',
	'',
	{
		host: 'localhost',
		dialect: 'mysql'
	});

const port: number = 5000;

interface ResponseMessage {
	message: string,
	success: boolean,
	status: number,
}


initiate.authenticate().then((): void => {
	console.log('Connection to database is success!');
}).catch((error: any) :void => {
	console.log('Unable to connect to database!');
})

const BookTable = initiate.define('books', {
	title: {
		type: Types.STRING,
		allowNull: false,
	},
	author: {
		type: Types.STRING,
		allowNull: false,
	},
	relase_date: {
		type: Types.DATEONLY,
	},
	subject: {
		type: Types.INTEGER
	}
})

app.get('/', (req: any, res:any):void => {
	let responseAPI: ResponseMessage = {
		message: 'Hello world!',
		success: true,
		status: 200
	}

	res.end(JSON.stringify(responseAPI));
});

app.get('/books', async(req:any, res: any): Promise<void> => {
	const query = await BookTable.findAll();
	res.end(JSON.stringify(query, null, 2));
})

app.listen(port, (): void => {
	console.log(`Server is running on port ${port}`);
});