import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const produtos = pgTable("produtos",{
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  preco: integer("preco").notNull(),
  vendas: integer("vendas").notNull(),
  demanda: integer("demanda").notNull(),
  vendas_ano_anterior: integer("vendas_ano_anterior").notNull()
});
