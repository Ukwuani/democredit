import { Knex } from "knex";

const tableName = "dcb_account_info"

export async function up(knex: Knex): Promise<void> {
    try {
        return knex.schema.createTable(tableName, table => {
            table.uuid("account_info_id").primary().notNullable();
            table.string("provider").notNullable();
            table.string("account_number").notNullable();
            table.string("bank_name").notNullable();
            table.string("bank_code").notNullable()
            table.string("currency").notNullable()
            table.foreign("account_info_id").references("account_info_id").inTable("dcb_wallet");
        })
    } catch (e) {Promise.reject(e)}
}


export async function down(knex: Knex): Promise<void> {
    try {
        return knex.schema.dropTable(tableName)
    } catch (exception) {
        Promise.reject(exception);
    }
}
