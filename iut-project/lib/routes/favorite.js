'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'POST',
        path: '/favorite',
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    userId: Joi.number().integer().required().description('Id of the target user'),
                    filmId: Joi.number().integer().required().description('Id of the target film')
                })
            }
        },
        handler: async (request) => {
            const { favoriteService } = request.services();
            const { userId, filmId } = request.payload;

            return await favoriteService.create(userId, filmId);
        }
    },
    {
        method: 'DELETE',
        path: '/favorite',
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    userId: Joi.number().integer().required().description('Id of the target user'),
                    filmId: Joi.number().integer().required().description('Id of the target film')
                })
            }
        },
        handler: async (request) => {
            const { favoriteService } = request.services();
            const { userId, filmId } = request.payload;

            return await favoriteService.delete(userId, filmId);
        }
    }
];