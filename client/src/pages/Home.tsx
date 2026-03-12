import "../styles/HomeStyles.css";
import { maisVedidos } from "../hooks/usefetchTopProdutos";
import { totalVendas } from "../hooks/usefetchAllVendas";
import { Taxa } from "../hooks/usefetchTaxa";
import { creci } from "../hooks/usefetchCrecimento";
import { Produtos } from "../services/servicesProdutos";

import {
  MdInventory2,
  MdTrendingUp,
  MdAttachMoney,
  MdCheckCircle,
  MdArticle,
  MdInbox,
  MdHourglassEmpty
} from "react-icons/md";

export default function Home() {

  const { data = [], isLoading, error } = maisVedidos();
  const { data: datavendidos } = totalVendas();
  const { data: dataTaxa } = Taxa();
  const { data: datacreci } = creci();

  return (
    <div className="dashboard-container">

      {/* CARDS */}
      <div className="cards-dashboard">

        <div className="card">
          <h3>
            <MdInventory2 size={20} /> Produtos Vendidos
          </h3>
          <p>{datavendidos?.total_vendas ?? 0}</p>
        </div>

        <div className="card">
          <h3>
            <MdTrendingUp size={20} /> Vendas vs Ano Anterior
          </h3>
          <p>
            {datavendidos?.total_vendas ?? 0} <small>{datacreci?.crecimento?.toFixed(2)}%</small>
          </p>
        </div>

        <div className="card">
          <h3>
            <MdCheckCircle size={20} /> Taxa de Sucesso
          </h3>
          <p>
            {datavendidos?.total_vendas ?? 0} <small>{dataTaxa?.taxa}%</small>
          </p>
        </div>

      </div>


      {/* ATUALIZAÇÕES */}
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

      </div>


      {/* LOADING */}
      {isLoading && (
        <p>
          <MdHourglassEmpty /> Carregando produtos...
        </p>
      )}


      {/* ERRO */}
      {error && (
        <p style={{ color: "red" }}>
          ❌ {(error as Error).message}
        </p>
      )}


      {/* SEM PRODUTOS */}
      {!isLoading && !error && data.length === 0 && (
        <p>
          <MdInbox /> Nenhum produto cadastrado.
        </p>
      )}


      {/* TABELA */}
      {!isLoading && !error && data.length > 0 && (

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

              {data.map((produto: ProdutosTop) => (

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
                      SKU: {produto.sku}
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
