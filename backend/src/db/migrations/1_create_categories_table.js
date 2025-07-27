/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return (
    knex.schema

      // Categories table:
      .createTable("categories", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("name").notNullable().unique();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      // Subcategories table:
      .createTable("subcategories", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("name").notNullable().unique();
        table
          .uuid("category_id")
          .references("id")
          .inTable("categories")
          .onDelete("CASCADE");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      .then(() => {
        return knex.raw(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER update_categories_updated_at
      BEFORE UPDATE ON categories
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();

      CREATE TRIGGER update_subcategories_updated_at
      BEFORE UPDATE ON subcategories
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
      `);
      })
  );
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("subcategories").dropTable("categories");
}
