import "../styles/HomeStyles.css";

import { usemaisVedidos } from "../hooks/usefetchTopProdutos";
import { usetotalVendas } from "../hooks/usefetchAllVendas";
import { useTaxa } from "../hooks/usefetchTaxa";
import { usecreci } from "../hooks/usefetchCrecimento";

import Graficos from "../components/graficos";

import {
  MdInventory2,
  MdTrendingUp,
  MdCheckCircle,
  MdAttachMoney,
  MdShoppingCart,
  MdStorage,
  MdAccessTime
} from "react-icons/md";

function saudacao() {
  const hora = new Date().getHours();

  if (hora < 12) return "Bom dia";
  if (hora < 18) return "Boa tarde";
  return "Boa noite";
}

export default function Home() {

  const { data: produtos = [], isLoading } = usemaisVedidos();
  const { data: totalVendas } = usetotalVendas();
  const { data: taxa } = useTaxa();
  const { data: crescimento } = usecreci();

  return (

    <div className="dashboard-container">

      {/* HEADER */}

      <header className="dashboard-header">

        <div>

          <h1>
            {saudacao()}, Admin 👋
          </h1>

          <p>Resumo geral do sistema de vendas</p>

        </div>

      </header>


      {/* CARDS PRINCIPAIS */}

      <section className="cards-dashboard">

        <div className="card">

          <h3>
            <MdShoppingCart /> Total de vendas
          </h3>

          <p>
            {totalVendas?.total_vendas ?? 0}
          </p>

        </div>


        <div className="card">

          <h3>
            <MdTrendingUp /> Crescimento
          </h3>

          <p>
            {crescimento?.crecimento?.toFixed(2) ?? 0}%
          </p>

        </div>


        <div className="card">

          <h3>
            <MdCheckCircle /> Taxa de sucesso
          </h3>

          <p>
            {taxa?.taxa ?? 0}%
          </p>

        </div>


        <div className="card">

          <h3>
            <MdInventory2 /> Produtos cadastrados
          </h3>

          <p>
            {produtos.length}
          </p>

        </div>

      </section>


      {/* GRAFICOS */}

      <section className="graficos-section">

        <Graficos />

      </section>


      {/* CARDS SECUNDARIOS */}

      <section className="cards-secundarios">

        <div className="mini-card">

          <MdAttachMoney size={24} />

          <div>

            <h4>Faturamento estimado</h4>

            <p>R$ 12.430</p>

          </div>

        </div>


        <div className="mini-card">

          <MdStorage size={24} />

          <div>

            <h4>Produtos em estoque</h4>

            <p>210</p>

          </div>

        </div>


        <div className="mini-card">

          <MdAccessTime size={24} />

          <div>

            <h4>Pedidos hoje</h4>

            <p>23</p>

          </div>

        </div>

      </section>


      {/* TABELA */}

      <section className="tabela-produtos">

        <h2>Top Produtos Vendidos</h2>

        {isLoading ? (

          <p>Carregando produtos...</p>

        ) : (

          <table className="produtos-table">

            <thead>

              <tr>

                <th>ID</th>
                <th>Produto</th>
                <th>Vendas</th>
                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {produtos.map((produto: any) => {

                const status =
                  produto.total_vendas > 200
                    ? "Popular"
                    : produto.total_vendas > 50
                      ? "Médio"
                      : "Baixo";

                return (

                  <tr key={produto.id}>

                    <td>{produto.id}</td>

                    <td>{produto.nome}</td>

                    <td>{produto.total_vendas}</td>

                    <td>

                      <span className={`status ${status.toLowerCase()}`}>
                        {status}
                      </span>

                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        )}

      </section>


      {/* ATIVIDADE */}

      <section className="atividade">

        <h2>Atividade recente</h2>

        <ul>

          <li>Produto arroz vendido</li>
          <li>Produto açúcar cadastrado</li>
          <li>Produto café atualizado</li>

        </ul>

      </section>

    </div>

  );
}
