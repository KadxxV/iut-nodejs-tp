'use strict';

const Joi = require('joi')

module.exports = [
    {
        method: 'post',
        path: '/film',
        options: {
            auth: { scope: ['admin'] },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    title: Joi.string().required().description('Title of the film'),
                    description: Joi.string().required().description('Description of the film'),
                    releaseDate: Joi.date().required().description('Release date of the film'),
                    director: Joi.string().required().description('Director of the film')
                })
            }

        },
        handler: async (request) => {

            const { filmService } = request.services();

            return await filmService.create(request.payload);
        }
    },
    {
        method: 'get',
        path: '/films',
        options: {
            tags:['api']
        },
        handler: async (request) => {

            const { filmService } = request.services();

            return await filmService.findAll();
        }
    },
    {
        method: 'delete',
        path: '/film/{id}',
        options: {
            tags:['api'],
            auth : { scope : ['admin'] },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().min(1)
                })
            }
        },
        handler: async (request) => {

            const { filmService } = request.services();

            return await filmService.delete(request.params.id);
        }
    },
    {
        method: 'patch',
        path: '/film/{id}',
        options: {
            tags:['api'],
            auth : { scope : ['admin'] },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().min(1)
                }),
                payload: Joi.object({
                    title: Joi.string().required().min(2).description('Title of the film'),
                    description: Joi.string().required().min(10).description('Description of the film'),
                    releaseDate: Joi.date().required().description('Release date of the film'),
                    director: Joi.string().required().description('Director of the film')
                })
            }
        },
        handler: async (request) => {

            const { filmService } = request.services();

            return await filmService.update(request.params.id, request.payload);
        }
    },
    {
        method: 'post',
        path: '/films/download',
        options: {
            auth: { scope: ['admin'] },
            tags: ['api'],
        },
        handler: async (request) => {

            const { filmService } = request.services();

            return await filmService.exportFilmToCSV(request.auth.credentials);
        }
    },
];
