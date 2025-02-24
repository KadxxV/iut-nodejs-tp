// File: services/film.js
'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');
const fastcsv = require('fast-csv');
const { PassThrough } = require('stream');

module.exports = class FilmService extends Service {
    static get name() {
        return 'filmService';
    }

    async create(film) {
        const { Film } = this.server.models();
        const { emailService, userService } = this.server.services();
        const newFilm = await Film.query().insertAndFetch(film);

        try {
            const users = await userService.findAll();
            for (const user of users) {
                await emailService.sendFilmAdditionEmail(user.email, newFilm);
            }
        } catch (error) {
            console.error('Error when trying to send new film email:', error);
            return newFilm;
        }
        return newFilm;
    }

    findAll() {
        const { Film } = this.server.models();
        return Film.query();
    }

    delete(id) {
        const { Film } = this.server.models();
        return Film.query().deleteById(id);
    }

    async update(id, film) {
        const { Film, Favorite } = this.server.models();
        const { emailService, userService } = this.server.services();
        const updatedFilm = await Film.query().patchAndFetchById(id, film);

        if (!updatedFilm) {
            throw Boom.notFound('Film not found');
        }

        try {
            const favorites = await Favorite.query().where('filmId', id);
            for (const favorite of favorites) {
                const user = await userService.getUserById(favorite.userId);
                await emailService.sendFavoriteFilmGotUpdatedEmail(user.email, updatedFilm);
            }
        } catch (error) {
            console.error('Error when trying to send updated film from favorites email:', error);
        }

        return updatedFilm;
    }


};