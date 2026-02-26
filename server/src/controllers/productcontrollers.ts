import { db } from "../database";
import { produtos } from "../database/schema";

export const getProdutos = async (req, res) => {
  try {
    const all = await db.select().from(produtos);
    return res.json(all);
  } catch (err) {
    return res.status(500).json({ erro: "Erro ao buscar produtos" });
  }
};

export const addProdutos = async (req, res) => { 
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
