'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');


module.exports = class FavoriteService extends Service {

    async create(userId, filmId) {
        const { Film, Favorite } = this.server.models();

        const film = await Film.query().findById(filmId);
        if (!film) {
            throw Boom.notFound('No film found corresponding to the given ID');
        }

        const favorite = await Favorite.query().findOne({ userId, filmId });
        if (favorite) {
            throw Boom.conflict('Film already in user\'s favorites');
        }

        return Favorite.query().insert({ userId, filmId });
    }

    async delete(userId, filmId) {
        const { Favorite } = this.server.models();

        const favorite = await Favorite.query().findOne({ userId, filmId });
        if (!favorite) {
            throw Boom.notFound('No film found corresponding to the given ID in user\'s favorites');
        }

        return Favorite.query().delete().where({ userId, filmId });
    }
}
