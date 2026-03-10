import { useEffect, useState } from "react";
import Graficos from "../components/graficos";
import "../styles/HomeStyles.css";

import {
  MdInventory2,
  MdTrendingUp,
  MdAttachMoney,
  MdCheckCircle,
  MdArticle,
  MdInbox,
  MdHourglassEmpty
} from "react-icons/md";

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

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
        console.error(err);
        setErro("Não foi possível carregar os produtos.");
      } finally {
        setLoading(false);
      }

    }

    carregarProdutos();

  }, []);

  return (
    <div className="dashboard-container">
      <div className="cards-dashboard">

        <div className="card">
          <h3>
            <MdInventory2 size={20} /> Produtos Vendidos
          </h3>
          <p>120</p>
        </div>

        <div className="card">
          <h3>
            <MdTrendingUp size={20} /> Vendas vs Ano Anterior
          </h3>
          <p>
            14.00 <small>+14%</small>
          </p>
        </div>

        <div className="card">
          <h3>
            <MdCheckCircle size={20} /> Taxa de Sucesso
          </h3>
          <p>
            140 vendidos <small>92%</small>
          </p>
        </div>
      </div>

      <div className="updates">
        <h2>
          <MdArticle size={22} /> Atualizações
        </h2>
        <p>
          Novos produtos adicionados ao sistema.
          <small> Data: 14/01/2900</small>
        </p>
        <p>
          arroz adicionado com sucesso.
          <small> Data: 12/02/1909</small>
        </p>
        <p>
          preco arroz modificado com sucesso
          <small> 12/02/1019</small>
        </p>
        <p>
          preco presunto modificado com sucesso
          <small> 12/02/1019</small>
        </p>
        <p>
          preco notebook modificado com sucesso
          <small> 12/02/1019</small>
        </p>
        <p>
          preco blusa gola polo adicionada com sucesso
          <small> 12/02/1019</small>
        </p>
      </div>

      <Graficos />

      {loading && (
        <p>
          <MdHourglassEmpty /> Carregando produtos...
        </p>
      )}
      {erro && (
        <p style={{ color: "red" }}>
          ❌ {erro}
        </p>
      )}
      {!loading && !erro && produtos.length === 0 && (
        <p>
          <MdInbox /> Nenhum produto cadastrado.
        </p>
      )}


      {/* TABELA */}

      {!loading && !erro && produtos.length > 0 && (

        <div className="tabela-produtos">

          <h2>
            <MdInventory2 size={22} /> Últimos produtos adicionados
          </h2>

          <table className="produtos-table">

            <thead>

              <tr>

                <th>ID</th>

                <th>Produto</th>

                <th>Preço</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {produtos.map((produto) => (

                <tr key={produto.id}>

                  <td className="produto-id">

                    {produto.id}

                  </td>


                  <td className="produto-info">

                    <div className="produto-nome">

                      <MdInventory2 size={18} />

                      {produto.nome}

                    </div>

                    <span className="produto-sku">

                      SKU: {produto.id + 2000}

                    </span>

                  </td>


                  <td className="produto-preco">

                    <MdAttachMoney />

                    R$ {produto.preco}

                  </td>


                  <td>

                    <span className="status ativo">

                      <MdCheckCircle size={16} />

                      Em estoque

                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}
