import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const userSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	user_name: String,
	email: String,
	password: String,
	phone: String,
	token: String,
	is_active:  { type:Boolean, default: false },
	created_at: { type: Date, default: new Date() },
	updated_at: { type: Date, default: new Date() },
	deleted_at: { type: Date, default: null }
});

userSchema.pre('save', function (next) {
	if(this.password) this.password = bcrypt.hashSync(this.password);
	next();
})

userSchema.pre('update', function (next) {
	if(this.password) this.password = bcrypt.hashSync(this.password);
	next();
})

userSchema.pre('updateOne', function (next) {
	const data = this.getUpdate()
	if(data.password) data.password = bcrypt.hashSync(data.password);
    this.update({}, data).exec()
    next()
})

export default mongoose.model('User', userSchema);