const {Sequelize, DataTypes} = require('sequelize');
const sequelize: any = new Sequelize(
	'sequelize',
	'root',
	'',
	{
		host: 'localhost',
		dialect: 'mysql'
	});


sequelize.authenticate().then(():void => {
	console.log('Connection to database is success!');
}).catch((error: any) => {
	console.log('Unable to connect to database!');
})

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

sequelize.sync().then(():void => {
	console.log('Book table was successfully created');
	Book.findOne({
		where: {
			id: 1
		}
	}).then((res:any ) => {
		console.log(res);
	}).catch((err:any) => {
		console.log(err);
	})
}).catch((err:any) => {
	console.log(`Failed to added table ${err}`);
})