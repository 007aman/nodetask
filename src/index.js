import 'dotenv/config';
import './errors';
import './models';
import './passport';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import appManager from './app';
import { restRouter } from './api';

global.appRoot = path.resolve(__dirname);

const PORT = config.app.port;
const app = appManager.setup(config, null);

app.use(cors());
app.use('/api', restRouter);
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.message = 'Invalid route';
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	if (!(error instanceof RequestError)) {
		error = new RequestError('Some Error Occurred', 500, error.message);
	}
	res.status(error.status || 500);
	let contype = req.headers['content-type'];
	var json = !(!contype || contype.indexOf('application/json') !== 0);
	if (json) {
		return res.json({ errors: error.errorList });
	} else {
		res.send(error.message)
	}
});


/* Database Connection */
mongoose.connect(config.db.connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Database connected successfully."))
.catch(err => console.log("Something went wrong Database connection.", err))

/* Start Listening service */
app.listen(PORT, () => {
	console.log(`Server is running at PORT http://localhost:${PORT}`);
});