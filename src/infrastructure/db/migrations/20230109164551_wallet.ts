import { Knex } from "knex";

const tableName = "dcb_wallet"

export async function up(knex: Knex): Promise<void> {
    try {
        
        return knex.schema.createTable(tableName, table => {
            table.uuid("wallet_id").primary().notNullable();
            table.uuid("account_info_id").notNullable();
            table.uuid("customer_id").notNullable();
            table.bigint("balance").defaultTo(0);
            table.enu("currency", ["NGN"]); // could be referencing the currents table
            table.string("transaction_pin").notNullable();
            table.foreign("account_info_id").references("dcb_account_info.account_info_id");
            table.foreign("customer_id").references("customer_id").inTable("dcb_customer");
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

