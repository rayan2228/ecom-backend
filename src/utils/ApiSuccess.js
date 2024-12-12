export class ApiSuccess {
    constructor(statusCode, message, data) {
        this.statusCode = statusCode
        this.status = true
        this.message = message
        this.data = data
    }
}