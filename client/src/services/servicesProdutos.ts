import { API_URL } from "../api/apiClient";

export interface Produtos {
  id: number;
  nome: string;
  preco: number;
  category: string;
  vendas: number;
  demanda: number;
  quantity: number;
  sku: number;

  comparacao_atual: {
    ano_anterior: number;
    variacao_percentual: number;
  };
}

export interface ProdutosTop {
  id: number;
  nome: string;
  total_vendas: number;
}

export interface vendasTotais {
  total_vendas: number;
}

export interface taxavalor {
  taxa: number;
}

export interface vendas_vs_vendas_ano_anterior {
  crecimento: number;
}

export async function getProdutos(): Promise<Produtos[]> {
  const response = await fetch(`${API_URL}/produtos`);

  if (!response.ok) {
    throw new Error("Erro ao buscar data produtos!!");
  }

  const data = await response.json();

  return data?.produtos ?? [];
}

export async function addProdutos(produto: Omit<Produtos, "id">) {
  const response = await fetch(`${API_URL}/addprodutos`, {
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
  const response = await fetch(`${API_URL}/delprodutos/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar produto!!");
  }

  return response.json();
}

export async function TopProdutos(): Promise<ProdutosTop[]> {
  const response = await fetch(`${API_URL}/topvendidos`);

  if (!response.ok) {
    throw new Error("Erro ao coletar TopProdutos!!");
  }

  const data = await response.json();
  return data?.dado ?? [];
}

export async function getTotaisVendas(): Promise<vendasTotais> {
  const response = await fetch(`${API_URL}/allvendas`);

  if (!response.ok) {
    throw new Error("Erro ao coletar data do all produtos!!");
  }

  const data = await response.json();
  return data?.data ?? [];
}

export async function getTaxaSucesso(): Promise<taxavalor[]> {
  const response = await fetch(`${API_URL}/taxasucesso`);

  if (!response.ok) {
    throw new Error("Erro ao coletar data da taxa!!");
  }

  const data = await response.json();
  return data?.dado ?? [];
}

export async function getCrecimento(): Promise<vendas_vs_vendas_ano_anterior> {
  const response = await fetch(`${API_URL}/crecimento`);

  if (!response.ok) {
    throw new Error("Erro nao coletar data do crecimento!!");
  }

  const data = await response.json();
  return data?.data ?? [];
}
