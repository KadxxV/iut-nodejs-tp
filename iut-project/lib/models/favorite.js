'use strict';



const { Model } = require('@hapipal/schwifty');
const Joi = require('joi');

class Favorite extends Model {
    static get tableName() {
        return 'favorites';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            userId: Joi.number().integer().required(),
            filmId: Joi.number().integer().required(),
            createdAt: Joi.date(),
        });
    }

    $beforeInsert(queryContext) {

        this.createdAt = this.updatedAt;
    }
}

module.exports = Favorite;