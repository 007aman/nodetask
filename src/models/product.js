import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    identifierId:String,
	name: String,
	description: String,
	created_at: { type: Date, default: new Date() },
	updated_at: { type: Date, default: new Date() },
	deleted_at: { type: Date, default: null }
});


export default mongoose.model('Product', productSchema);