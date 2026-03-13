import { useState, useEffect } from "react";
import "../styles/TabelaAllProdutosPageTwoStyles.css";

interface Produto {
  id: number;
  nome: string;
  category: string;
  quantity: number;
  preco: number;
  vendas: number;
  sku: string;
}

export default function TabellaAllPages() {
  const [data, setData] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    async function buscadados() {
      try {
        const result = await fetch("https://deshboard-tile-dates-produtos-one.onrender.com/api/produtos");

        if (!result.ok) {
          throw new Error("Api nao retornado dados");
        }

        const response = await result.json();
        setData(response.produtos);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    buscadados();
  }, []);

  const produtosFiltrados = busca ? data.filter((produto) => produto.nome.toLowerCase().includes(busca.toLocaleLowerCase()) || String(produto.sku).toLowerCase().includes(busca.toLocaleLowerCase())) : data;

  const getStatus = (quantity: number | undefined) => {
    if (quantity === 0) return { texto: "Esgotado", classe: "esgotado" };
    if (quantity <= 5) return { texto: "Baixo", classe: "Baixo" };
    return { texto: "Em estoque", classe: "estoque" };
  };

  return (
    <div className="div_tabela">
      <h1 className="titulo" >Todos os Produtos</h1>
      <p className="subtitulo" >Gerencie todos os produtos do sistema</p>
      <div className="search_box" >
        <input
          type="text"
          placeholder="Busca por nome ou SKU..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>
      <p className="info_quantidade" > Mostrando {produtosFiltrados.length} de {data.length} produtos</p>
      <div className="div_topo">
        <p>id</p>
        <p>nome</p>
        <p>category</p>
        <p>quantity</p>
        <p>preco</p>
        <p>vendas</p>
        <p>status</p>
      </div>
      <div className="div_lista_produtos">
        {error && <p className="error_p">Erro ao carregar data{error}</p>}
        {loading && <p className="loading_p">Carregando...</p>}

        {!loading && !error && produtosFiltrados.map((produto) => {
          const status = getStatus(produto.quantity);

          return (
            <div className="barra_produto" key={produto.id}>
              <div>{produto.id}</div>
              <div className="produtos_info" >
                <span className="nome" >{produto.nome}</span>
                <span className="sku" >SKU: {produto.sku}</span>
              </div>
              <div>{produto.category}</div>
              <div>{produto.quantity}</div>
              <div>RS {produto.preco}</div>
              <div>{produto.vendas}</div>
              <div className={`status ${status.classe}`} >{status.texto}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
