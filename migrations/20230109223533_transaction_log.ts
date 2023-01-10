import { Knex } from "knex";


const tableName = "dcb_account_info"

export async function up(knex: Knex): Promise<void> {
    try {
        return knex.schema.createTable(tableName, table => {
            table.uuid("transaction_log_id").primary().notNullable();
            table.uuid("wallet_id");
            table.string("description");
            table.string("transaction_ref").unique().notNullable();
            table.enu("type", ["CREDIT", "DEBIT"]).notNullable() // this could be a seperate table
            table.enu("payment_type", ["WALLET", "BANK"]).notNullable() // this could be a seperate table
            table.enu("currency", ["NGN"]).defaultTo("NGN") // this could be a seperate table
            table.string("provider").defaultTo("DemoCredit")
            table.bigint("amount")
            table.text("source")
            table.text("destination")
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
