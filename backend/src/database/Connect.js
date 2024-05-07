import typeorm from 'typeorm';

const dataSource = new typeorm.DataSource({
  type: 'mysql',
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  synchronize: true,
  entities: ['src/**/entities/*.js'],
});

dataSource
  .initialize()
  .then(() => console.log('Connected'))
  .catch(function (error) {
    console.log('Error: ', error);
  });

export default dataSource;
