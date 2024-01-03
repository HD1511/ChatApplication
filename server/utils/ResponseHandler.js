module.exports = {
    ResponseHandler: (StatusCode,Status,Message,res,Data=null) => {
        res.status(StatusCode).json({
            Status,
            Message,
            Data
        })
    }
}