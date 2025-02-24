'use strict';

module.exports = {
    async up(knex) {
        await knex.schema.createTable('film', (table) => {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.string('description');
            table.string('director');
            table.date('releaseDate');
            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
            table.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('film');
    }
};