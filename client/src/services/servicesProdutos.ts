import { API_URL } from "../api/apiClient";

export interface Produtos {
  id: number;
  nome: string;
  preco: number;
  category: string;
}

export async function getProdutos(): Promise<Produtos[]> {
  const response = await fetch(`{API_URL}/produtos`);

  if (!response.ok) {
    throw new Error("Erro ao buscar data produtos!!");
  }

  return response.json();
}

export async function addProdutos(produto: Omit<Produtos, "id">) {
  const response = await fetch(`{API_URL}/addprodutos`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(produto)
  });

  if (!response.ok) {
    throw new Error("Erro ao adicionar produtos!!");
  }

  return response.json();
}

export async function delProdutos(id: number) {
  const response = await fetch(`{ API_URL }/delprodutos${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar produto!!");
  }

  return response.json();
}
