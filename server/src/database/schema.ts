import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const produtos = pgTable("produtos", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  category: text("category").notNull(),
  quantity: integer("quantity").notNull(),
  sku: integer("sku").unique(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  preco: integer("preco").notNull(),
  vendas: integer("vendas").notNull(),
  demanda: integer("demanda").notNull(),
  vendas_ano_anterior: integer("vendas_ano_anterior").notNull()
});
