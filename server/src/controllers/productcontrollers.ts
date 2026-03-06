import { db } from "../database";
import { produtos } from "../database/schema";
import { Request, Response } from "express";

export const getProdutos = async (req: Request, res: Response) => {
  try {
    const data = await db.select().from(produtos);
    const produtosFormatados = data.map((produto) => {
      const variacao = ((produto.preco - produto.vendas_ano_anterior) / produto.vendas_ano_anterior) * 100;

      return {
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        vendas: produto.vendas,
        demanda: produto.demanda,
        comparacao_atual: {
          ano_anterior: produto.vendas_ano_anterior,
          variacao_percentual: Number(variacao.toFixed())
        }
      };
    });

    res.json({
      "produtos": produtosFormatados
    });

  } catch (err: any) {
    console.error("ERRO REAL:", err);
    return res.status(500).json({ erro: err.message });
  }
};

export const addProdutos = async (req: Request, res: Response) => { 
  try {
    console.log("BODY COMPLETO: ", req.body);
    const { nome, preco } = req.body;
    
    console.log("Recebido no Back-end:", nome, preco);

    if (!nome) {
      return res.status(400).json({ erro: "Nome é obrigatório!!" });
    }

    const all = await db.insert(produtos).values({ nome, preco }).returning();

    return res.status(201).json({
      sucesso: true,
      mensagem: "Produto adicionado com sucesso!!!",
      dado: all[0]
    });
  } catch (err: any) {
    console.log("Erro ao adicionar produto:", err);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Produto não adicionado",
      dado: err.message,
    });
  }
};
