import Joi from 'joi';
import { AppError } from '../errors/AppError.js';

const users = {};

class UserController {
    execute(request, response) {
        const { action, amount } = request.body;
        const { username } = request.params;

        let user = users[username];
        if (!user) {
            user = {
                id: username,
                userAmount: 0,
            };
            users[username] = user;
        }

        const schema = Joi.object({
            username: Joi.string()
                .email({ tlds: { allow: false } })
                .valid('JohnDoe@example.com')
                .error(
                    () =>
                        new AppError(
                            'Validation error',
                            'username is required, must be valid email and must be [JohnDoe@example.com]'
                        )
                ),
            action: Joi.string()
                .valid('Remove', 'Add')
                .required()
                .error(
                    () =>
                        new AppError(
                            'Validation error',
                            'action is required and must be one of [Remove, Add]'
                        )
                ),
            amount: Joi.number()
                .greater(0)
                .required()
                .error(
                    () =>
                        new AppError(
                            'Validation error',
                            'amount is required, number and must be greater than 0'
                        )
                ),
        });

        const isValid = schema.validate({ username, action, amount });

        if (isValid.error) {
            throw isValid.error;
        }

        switch (action) {
            case 'Add':
                user.userAmount += amount;
                break;
            case 'Remove':
                if (amount > 200) {
                    throw new AppError(
                        'Validation error',
                        'amount must be less than 200 if action is Remove'
                    );
                }

                user.userAmount -= amount * 0.1;
                if (user.userAmount < 0) {
                    user.userAmount = 0;
                }
                break;
            default:
                break;
        }

        return response.status(200).json({
            username: user.id,
            action,
            amount: user.userAmount,
        });
    }
}

export { UserController };
