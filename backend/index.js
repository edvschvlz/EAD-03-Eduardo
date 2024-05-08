import express from 'express';
import cors from 'cors';
import routes from './src/router.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
