class AppError extends Error {
    constructor(message, field, statusCode = 400) {
        super(message);
        this.field = field;
        this.statusCode = statusCode;
    }
}

export { AppError };
