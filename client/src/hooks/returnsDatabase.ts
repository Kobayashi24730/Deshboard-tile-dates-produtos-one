import { error } from "console";
import "dotenv/config";
import { response } from "express";

async function getReturnsOfDatabase() {
  try {
    const response = await fetch(import.meta.env.VITE_URL_BACKEND_ALL);
    if (!response.ok) {
      throw new Error(`Erro no servidor {response.status}`)
    }
    const resultados = await response.json();
    console.log("Os dados retornados sao ", resutados);
    return resultados;
  } catch (err) {
    const messageErro = err instanceof Error ? err.message : "Erro desconhecido";
    console.log("Erro ao retorar os dados", messageErro);
    return {error: true, message: mensagemErro};
  }
}

async function getReturnsOfAddProdutos(nome: string,preco: number) {
  try {
    const response = await fetch(import.meta.inv.VITE_URL_BACKEND_ADD, {
      method: "POST",
      headers: {"Content-type": "application/json",},
      body: JSON.stringify({ nome, preco}),

    });
    if (!response.ok){
      throw new Error (`Erro no servidor {response.status}`);
    }
    const resultados = response.json();
    console.log("Produto adicionado com sucesso!! ", resultados)
    return resultados;
  } catch (err) {
    const messageErro = err instanceof Error ? err.message : "Erro desconhecido";
    console.log("Ocorreu um erro ao adicionar o produto ", messageErro);
    return {error: true, message: messageErro};
  }
}
