/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable("businesses", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.boolean("approved").notNullable().defaultTo(false);
      table.string("business_name").notNullable();
      table.string("slug").nullable().unique();
      table.string("city").notNullable();
      table.string("region").notNullable();
      table.boolean("reserve").notNullable().defaultTo(false);
      table.string("country").notNullable();
      table.string("contact_name").notNullable();
      table.string("contact_position").notNullable();
      table.string("contact_phone").nullable();
      table.string("contact_email").notNullable();
      table
        .uuid("category_id")
        .references("id")
        .inTable("categories")
        .onDelete("SET NULL");
      table
        .uuid("subcategory_id")
        .references("id")
        .inTable("subcategories")
        .onDelete("SET NULL");
      table.string("business_type").notNullable();
      table.string("website").nullable();
      table.string("facebook").nullable();
      table.string("instagram").nullable();
      table.string("twitter").nullable();
      table.string("linkedin").nullable();
      table.string("youtube").nullable();
      table.string("tiktok").nullable();
      table.string("pinterest").nullable();
      table.string("snapchat").nullable();
      table.text("business_description").notNullable();
      table.text("products_or_services").notNullable();
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
  
        CREATE TRIGGER update_businesses_updated_at
        BEFORE UPDATE ON businesses
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
      `);
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("businesses");
}
