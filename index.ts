const orm: any = require('sequelize');
const initiate: any = new orm(
	'sequelize',
	'root',
	'',
	{
		host: 'localhost',
		dialect: 'mysql'
	});

initiate.authenticate().then((): void => {
	console.log('Connection to database is success!');
}).catch((error: any) :void => {
	console.log('Unable to connect to database!');
})