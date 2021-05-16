export default {
    async index(req, res, next){
        db.Product.aggregate([
            {
             $lookup:
                {
                    from : "likedproducts",
                    localField: "identifierId",
                    foreignField: "productId",
                    as:"productdetails"
                },
            },{
                $match: {'productdetails.isLiked':true},
            }
         ])
        .then(products => {
            res.status(200).json({success: true, message: 'Wislist get successfully', products: products})
        })
        .catch(err => {
            console.log(err);
            next(err);
        })
    },
    async liked(req, res, next){
        const { productId, isLike = false } = req.body;
        db.likedProduct.findOne({'userId': req.user._id,'productId': productId})
        .then(likeProduct =>{
           if(likeProduct){
                return db.likedProduct.updateOne({
                    _id: likeProduct._id
                }, {
                    $set: {
                        isLiked: isLike
                    }
                })
            } else {
                return db.likedProduct.create({
                    isLiked: isLike,
                    userId: req.user._id,
                    productId: productId
                })
            }
        })
        .then(likeProduct => {
            res.status(200).json({success: true,message:"Status changed successfully"})
        })
        .catch(err => {
            console.log(err);
            next(err);
        })
    }
};