import express, { json } from 'express';
import { router } from './routes.js';
import { AppError } from './errors/AppError.js';

const app = express();

app.use(json());
app.use(router);

app.use((err, request, response, next) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message,
            field: err.field,
            statusCode: err.statusCode,
        });
    }

    return response.status(500).json({
        message: `${err.message}`,
        statusCode: 500,
    });
});

export { app };
