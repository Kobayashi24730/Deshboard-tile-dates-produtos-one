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
        setData(response);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    buscadados();
  }, []);

  const produtosFiltrados = busca ? data.filter((produto) => produto.nome.toLowerCase().includes(busca.toLocaleLowerCase()) || produto.sku.toLowerCase().includes(busca.toLocaleLowerCase())) : data;

  const getStatus = (quantity: number) => {
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
      </div>
      <div className="div_lista_produtos">
        {error && <p className="error_p">Erro ao carregar data{error}</p>}
        {loading && <p className="loading_p">Carregando...</p>}

        {!loading && !error && produtosFiltrados.map((produto) => {
          const status = getStatus(produto.quantity);

          return (
            <ul className="barra_produto" key={produto.id}>
              <li>{produto.id}</li>
              <li className="produtos_info" >
                <span className="nome" >{produto.nome}</span>
                <span className="sku" >SKU: {produto.sku}</span>
              </li>
              <li>{produto.category}</li>
              <li>{produto.quantity}</li>
              <li>RS {produto.preco}</li>
              <li>{produto.vendas}</li>
              <li className={`status ${status.classe}`} >{status.texto}</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
