const { CustomAPIError } = require("../error/customError")
const errorHandler = (err,req,res,next) => {
    console.log(err instanceof CustomAPIError);
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(500).json({msg:`Something went wrong, please try again later`})
}

module.exports = errorHandler