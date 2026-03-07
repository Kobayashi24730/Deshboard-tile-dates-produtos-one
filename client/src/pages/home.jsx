import { useEffect, useState } from "react";
import Gaficos from "../components/graficos";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const response = await fetch(
          "https://deshboard-tile-dates-produtos-one.onrender.com/api/produtos"
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar produtos");
        }

        const data = await response.json();
        
        setProdutos(data.produtos);
      } catch (err) {
        console.error("Erro no fetch:", err);
        setErro("Não foi possível carregar os produtos.");
      } finally {
        setLoading(false);
      }
    }

    carregarProdutos();
  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <Gaficos />

      <h1>Lista de Produtos</h1>

      {loading && <p>Carregando produtos...</p>}

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {!loading && !erro && produtos.length === 0 && (
        <p>Nenhum produto cadastrado.</p>
      )}

      {!loading && !erro && produtos.length > 0 && (
        <ul>
          {produtos.map((produto) => (
            <li key={produto.id}>
              <strong>{produto.nome}</strong> — R$ {produto.preco}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
