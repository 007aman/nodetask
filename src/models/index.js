import { readdirSync } from 'fs';
import { basename as _basename } from 'path';
import path from 'path';
import mongoose from 'mongoose';
import config from '../config';

const basename = _basename(__filename);
var schema = mongoose.connect(config.db.connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
global.db = schema;

readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        var model = require(path.join(__dirname, file))['default']
        db[model.modelName] = model;
    });