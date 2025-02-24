'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('favorite', (table) => {

            table.increments('id').primary();
            table.integer('userId').unsigned().notNullable();
            table.integer('filmId').unsigned().notNullable();

            table.foreign('userId').references('id').inTable('user').onDelete('CASCADE');
            table.foreign('filmId').references('id').inTable('film').onDelete('CASCADE');
            table.unique(['userId', 'filmId']);

            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('favorite');
    }
};
