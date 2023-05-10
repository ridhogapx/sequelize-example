const {Sequelize, DataTypes} = require('sequelize');
const sequelize: any = new Sequelize(
	'sequelize',
	'root',
	'',
	{
		host: 'localhost',
		dialect: 'mysql'
	});

/* Define schema */
const Book = sequelize.define('books', {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	author: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	relase_date: {
		type: DataTypes.DATEONLY,
	},
	subject: {
		type: DataTypes.INTEGER
	}
})

interface ResponseMessage {
	message: string,
	success: boolean,
	status: number,
}

// With promise way
// sequelize.sync().then((): void => {
// 	console.log('Book table was successfully created');
// 	Book.findOne({
// 		where: {
// 			id: 1
// 		}
// 	}).then((res:any ) => {
// 		console.log(`Filtered data by ID: ${JSON.stringify(res,null,2)}`);
// 	}).catch((err:any) => {
// 		console.log(err);
// 	})
// }).catch((err:any) => {
// 	console.log(`Failed to added table ${err}`);
// })

export const BookAuthenticate = async(): Promise<void> => {
	try {
		await sequelize.authenticate();
		console.log(`Connection to database is success!`);
	} catch (err) {
		console.log(`Connection to database is failed ${err}`);
	}
}

export const BookSync = async(): Promise<void> => {
	try {
		await sequelize.sync();
		console.log('Book table was successfully created!');
	} catch (err) {
		console.log(`There is error while adding table ${err}`);
	}
}

// With async await
export const retrieveData = async(req: any, res: any): Promise<void> => {
	try {
		const query = await Book.findAll();
		res.end(JSON.stringify(query,null,2));
	} catch {
		const failedResponse: ResponseMessage = {
			message: 'Data not found',
			success: false,
			status: 404
		};

		res.end(JSON.stringify(failedResponse, null, 2));
	}
}

