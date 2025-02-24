'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Film extends Model {

    static get tableName() {

        return 'film';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().required().min(2).example('Babylon'),
            description: Joi.string().required().min(10).example('Ce drame historique raconte la réussite et le déclin de six personnages principalement dans l\'industrie cinématographique à la fin des années 1920.'),
            releaseDate: Joi.date().required().example('2022-12-23'),
            director: Joi.string().required().example('Damien Chazelle'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }
};
