import mongoose from 'mongoose';

const likedProductSchema = new mongoose.Schema({
	userId: String,
	productId: String,
    isLiked:{ type: Boolean, default: false },
	created_at: { type: Date, default: new Date() },
	updated_at: { type: Date, default: new Date() },
	deleted_at: { type: Date, default: null }
});


export default mongoose.model('likedProduct', likedProductSchema);