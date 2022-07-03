class CustomAPIError extends Error{
    constructor(message,statusCode)
    {
        super(message)
        this.statusCode=statusCode
    }
}

const CreateCustomError = (msg,statusCodes) => {
    return new CustomAPIError(msg,statusCode)
}

module.exports = { CreateCustomError,CustomAPIError}
