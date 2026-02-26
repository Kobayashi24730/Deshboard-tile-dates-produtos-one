import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const produtos = pgTable("produtos",{
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  preco: integer("preco").notNull(),
});
