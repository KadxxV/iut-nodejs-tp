'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');

module.exports = class UserService extends Service {

    async create(user) {
        const { User } = this.server.models();
        const { emailService } = this.server.services();
        const newUser = await User.query().insertAndFetch(user);

        await emailService.sendAccountCreationEmail(newUser.email, newUser.firstName);

        return newUser;
    }

    findAll() {
        const { User } = this.server.models();
        return User.query();
    }

    delete(id) {
        const { User } = this.server.models();
        return User.query().deleteById(id);
    }

    update(id, user) {
        const { User } = this.server.models();
        return User.query().findById(id).patch(user);
    }

    async login(email, password) {
        const { User } = this.server.models();

        const user = await User.query().findOne({ email, password });

        if (!user) {
            throw Boom.unauthorized('Invalid credentials');
        }

        const token = Jwt.token.generate(
            {
                aud: 'urn:audience:iut',
                iss: 'urn:issuer:iut',
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                scope: user.roles
            },
            {
                key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
                algorithm: 'HS512'
            },
            {
                ttlSec: 14400 // 4 hours
            }
        );

        return token;
    }

    async setAdminRole(id) {
        const { User } = this.server.models();

        const user = await User.query().findById(id);
        if (!user) {
            throw Boom.notFound("Utilisateur non trouvé");
        }

        if (user.roles.includes('admin')) {
            throw Boom.badRequest("L'utilisateur est déjà administrateur");
        }

        await User.query()
            .findById(id)
            .patch({ roles: [...user.roles, 'admin'] });

        return { message: "L'utilisateur a été promu administrateur" };
    }

    getUserById(id) {
        const { User } = this.server.models();
        return User.query().findById(id);
    }

    async notifyFilmAddition(to, filmTitle) {
        const { emailService } = this.server.services();
        await emailService.sendFilmAdditionEmail(to, filmTitle);
    }

    async notifyFavoriteFilmUpdate(to, filmTitle) {
        const { emailService } = this.server.services();
        await emailService.sendFavoriteFilmGotUpdatedEmail(to, filmTitle);
    }

    async sendFilmsCSV(to, csvStream) {
        const { emailService } = this.server.services();
        await emailService.sendFilmsCSVByEmail(to, csvStream);
    }
}