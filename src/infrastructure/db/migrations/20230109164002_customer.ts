import { Knex } from "knex";

const tableName = "dcb_customer";

export async function up(knex: Knex): Promise<void> {
    try {
    return knex.schema.createTable(tableName, table => {
        table.uuid("customer_id").primary().notNullable();
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.string("email").unique().notNullable();
        table.string("phone_number").notNullable();
        table.string("password").notNullable();
        table.date("date_of_birth");
        table.string("avatar");
        table.boolean("phone_verified").defaultTo(false);
        table.timestamps(true, true);
    }) } catch (exception) {
        return Promise.reject(exception);
    }
}


export async function down(knex: Knex): Promise<void> {
    try {
        return knex.schema.dropTable(tableName)
    } catch (exception) {
        Promise.reject(exception);
    }
}

