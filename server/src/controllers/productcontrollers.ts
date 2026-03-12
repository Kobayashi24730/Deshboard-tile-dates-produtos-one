import { db } from "../database";
import { produtos, administracao, clients } from "../database/schema";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { eq, sql } from "drizzle-orm";


export const getProdutos = async (req: Request, res: Response) => {
  try {
    const data = await db.select().from(produtos);
    const produtosFormatados = data.map((produto) => {
      const variacao = produto.vendas_ano_anterior === 0 ? 0 : ((produto.vendas - produto.vendas_ano_anterior) / produto.vendas_ano_anterior) * 100;

      return {
        id: produto.id,
        nome: produto.nome,
        category: produto.category,
        preco: produto.preco,
        vendas: produto.vendas,
        demanda: produto.demanda,
        quantity: produto.quantity,
        sku: produto.sku,
        description: produto.description,
        image: produto.image,
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
    const {
      nome,
      category,
      quantity,
      sku,
      description,
      image,
      preco,
      vendas,
      demanda,
      vendas_ano_anterior,
      tentativas_compra
    } = req.body;

    if (nome == null || preco == null || vendas == null || demanda == null || vendas_ano_anterior == null) {
      return res.status(400).json({ erro: "Nome é obrigatório!!" });
    }

    const all = await db
      .insert(produtos)
      .values({
        nome,
        category,
        quantity,
        sku,
        description,
        image,
        preco,
        vendas,
        demanda,
        vendas_ano_anterior,
        tentativas_compra
      })
      .returning();
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

export const editarProduto = async (req: Request, res: Response) => {
  try {
    const { id, sku, nome, preco, quantity } = req.body;
    if (id == null || sku == null) {
      return res.status(400).json({
        error: "Parametros IS e SKU necessarios para edicao!!"
      });
    }

    const edicao = await db.execute(sql`
      UPDATE produtos 
      SET nome = ${nome},
        preco = ${preco},
        quantity = ${quantity}
      WHERE id = ${id}
    `);

    return res.status(200).json({
      sucesso: true,
      mensagem: "Produto editado com sucesso!!",
      data: edicao
    });
  } catch (err: any) {
    console.log("Erro ao editar produto: ", err)
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao editar produtos.",
      data: err.message
    });
  }
};

export const excluirProduto = async (req: Request, res: Response) => {
  try {
    const { id, sku } = req.body;

    if (id == null || sku == null) {
      return res.status(400).json({
        error: "Parametros ID ou SKU sao necessarios!!"
      });
    }
    const del = await db.delete(produtos).where(eq(produtos.id, Number(id)));

    return res.status(200).json({
      sucesso: true,
      mensagem: "Produto deletado com sucesso!!",
      data: del
    });
  } catch (err: any) {
    console.log("Erro ao deletar produto: ", err);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao deletar produto!!",
      data: err.message
    });
  }
};

export const editarClient = async (req: Request, res: Response) => {
  try {
    const { id, nome, email, senha } = req.body;

    if (id == null || nome == null || email == null || senha == null) {
      return res.status(400).json({
        error: "Parametros ID,Nome,Email,senha sao obrigatórios!!"
      });
    }
    const hash = await bcrypt.hash(senha, 10);

    const edicao = await db.execute(sql`
      UPDATE clients
      SET nome = ${nome},
        email = ${email},
        senha = ${hash}
      WHERE id = ${id}
    `);

    return res.status(200).json({
      sucesso: true,
      mensagem: "Client editado com sucesso!!",
      data: edicao
    });
  } catch (err: any) {
    console.log("Erro ao editar as informacoes do client:", err)
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao editar as informacoes do client",
      data: err.message
    });
  }
};

export const excluirClient = async (req: Request, res: Response) => {
  try {

    const { nome, email } = req.body;

    if (nome == null || email == null) {
      return res.status(400).json({
        error: "Erro ao excluir client"
      });
    }

    const del = await db.delete(clients).where(eq(clients.email, email));

    return res.status(200).json({
      sucesso: true,
      mensagem: "Client excluido com sucesso",
      data: del
    });
  } catch (err: any) {
    console.log("Erro ao deletar client:", err)
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao deletar client",
      data: err.message
    });
  }
};

export const TopVendidos = async (req: Request, res: Response) => {
  try {
    const all = await db.execute(sql`
      SELECT id,nome, vendas AS total_vendas
      FROM produtos 
      ORDER BY vendas DESC LIMIT 5
    `);

    return res.status(200).json({
      sucesso: true,
      mensagem: "Top Produtos encontrados com sucesso!",
      dado: all.rows
    });

  } catch (err: any) {
    console.log("Erro ao coletar Top produtos:", err);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Top Produtos nao encontrados.",
      dado: err.message,
    });
  }
};

export const AllVendas = async (req: Request, res: Response) => {
  try {
    const result = await db.execute(sql`SELECT SUM(vendas) AS total_vendas FROM produtos`);
    const total = Number(result.rows[0].total_vendas ?? 0);

    return res.status(200).json({
      sucesso: true,
      mensagem: "Data coletada com sucesso!!",
      data: total
    });
  } catch (err: any) {
    console.log("Erro ao coletar data da api: ", err);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao coletar data!!",
      data: err.message
    });
  }
}

export const taxa_sucesso = async (req: Request, res: Response) => {
  try {
    const result = await db.execute(sql` SELECT SUM(vendas) as vendas,SUM(tentativas_compra) as tentativas FROM produtos `);

    const vendas = Number(result.rows[0].vendas);
    const tentativas = Number(result.rows[0].tentativas);
    const taxa = tentativas === 0 ? 0 : (vendas / tentativas) * 100;

    return res.status(200).json({
      sucesso: true,
      mensagem: "Taxa retornados com sucesso!!",
      dado: taxa.toFixed(2)
    });
  } catch (err: any) {
    console.log("Erro ao coletar dados: ", err);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao coletar dados!!",
      dado: err.message
    });
  }
}

export const vendas_vs_vendas_ano_anterior = async (req: Request, res: Response) => {
  try {
    const result = await db.execute(sql`SELECT SUM(vendas) as vendas,SUM (vendas_ano_anterior) AS vendas_ano_anterior FROM produtos`);
    const vendas = Number(result.rows[0].vendas);
    const passado = Number(result.rows[0].vendas_ano_anterior);
    const crecimento = passado === 0 ? 0 : ((vendas - passado) / passado) * 100;

    return res.status(200).json({
      sucesso: true,
      mensagem: "Data coletada com sucesso!!",
      data: crecimento
    });
  } catch (err: any) {
    console.log("Erro ao coletar data: ", err);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao coletar dados da api!!",
      data: err.message
    });
  }
}

export const getClients = async (req: Request, res: Response) => {
  try {
    const dados = await db.select().from(clients);

    const ClientsFormatados = dados.map((client) => {
      return {
        id: client.id,
        nome: client.nome,
        email: client.email,
        cargo: client.cargo
      };
    });

    return res.json({
      "clients": ClientsFormatados
    });
  } catch (err: any) {
    console.log("Erro ao coletar data clients: ", err);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao coletar data clinets",
      data: err.message
    });
  }
};

export const AddClients = async (req: Request, res: Response) => {
  try {
    const { nome, senha, email, cargo } = req.body;

    if (nome == null || senha == null || email == null) {
      res.status(400).json({
        error: "Erro parametros Nome,Email,senha sao obrigatórios!",
      })
    }

    const hash = await bcrypt.hash(senha, 10);

    const emailExits = await db.select().from(clients).where(eq(clients.email, email));
    if (emailExits.length > 0) {
      return res.status(400).json({
        error: "Erro Email ja cadastrado",
      })
    }

    const all = await db.insert(clients).values({
      nome,
      senha: hash,
      email,
      cargo
    }).returning();

    return res.status(200).json({
      sucesso: true,
      mensagem: "Usuarios criado com sucesso!",
      dado: all[0],
    })
  } catch (err: any) {
    console.log("Erro ao coletar as informacoes dos usuarios: ", err);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Usuarios nao criado.",
      dado: err.message,
    });
  }
};

export const getAtualizacoes = async (req: Request, res: Response) => {
  try {
    const data = await db.select().from(administracao);
    const AtualizacoesFormatadas = data.map((Atu) => {
      return {
        id: Atu.id,
        atualizacao: Atu.atualizacao
      };
    });

    res.json({
      "Atualizacoes": AtualizacoesFormatadas
    });
  } catch (err: any) {
    return res.status(500).json({
      sucesso: false,
      mensagem: "Nao foi possivel pegar as atualizacoes",
      data: err.message
    });
  }
}
