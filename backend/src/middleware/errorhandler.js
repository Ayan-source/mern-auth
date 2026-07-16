const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        success: false,
        message: err.message
    })
}
module.exports = errorHandler;


// Jab tum kisi route mein next(new AppError('Something went wrong', 500)) likhte ho, toh Express automatically tumhare saare normal routes ko skip kar deta hai aur seedha Error Middleware ke paas chala jata hai.