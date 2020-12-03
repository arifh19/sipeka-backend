const response = (res, status, message, result = {}) => {
    let desc = ""

    switch (status) {
        case 200:
            desc = "OK"
            break
        case 201:
            desc = "Created"
            break
        case 400:
            desc = "Bad Request"
            break
        case 401:
            desc = "Unauthorized"
            break
        case 500:
            desc = "Internal Server Error"
            break
        case 501:
            desc = "Bad Gateway"
            break
        case 304:
            desc = "Not Modified"
            break
        default:
            desc = ""
    }

    const results = {
        status: status,
        description: desc,
        message: message,
        data: result,
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(status).json(results)
}

module.exports = response