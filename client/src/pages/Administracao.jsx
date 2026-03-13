import "../styles/AdministracaoStyles.css";
import { useEffect, useState } from "react";
import { useProdutos } from "../hooks/usefetch";

export default function Administracao() {

  const [texto, setTexto] = useState("Produtos");
  const [tipo, setTipo] = useState("produtos");
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);

  const { data, isLoading, error } = useProdutos();

  const itensPorPagina = 6;

  /* animação do título */

  useEffect(() => {

    const interval = setInterval(() => {
      setTexto(prev =>
        prev === "Produtos"
          ? "Usuarios"
          : prev === "Usuarios"
            ? "Anuncios"
            : "Produtos"
      );
    }, 4000);

    return () => clearInterval(interval);

  }, []);

  /* filtro */

  const produtosFiltrados =
    data?.filter(produto =>
      produto.nome.toLowerCase().includes(busca.toLowerCase())
    ) || [];

  /* paginação */

  const inicio = (pagina - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;

  const produtosPagina = produtosFiltrados.slice(inicio, fim);

  const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina);

  return (

    <div className="admin-container">

      {/* HEADER */}

      <div className="admin-header">

        <h1 key={texto} className="titulo-animado">
          Administração dos {texto}
        </h1>

        <div className="admin-actions">
          <p>Criação</p>
          <p>Edição</p>
          <p>Excluir</p>
          <p>Visualização detalhada</p>
        </div>

      </div>


      {/* MENU */}

      <div className="admin-menu">

        <button
          className={tipo === "produtos" ? "active" : ""}
          onClick={() => setTipo("produtos")}
        >
          Produtos
        </button>

        <button
          className={tipo === "usuarios" ? "active" : ""}
          onClick={() => setTipo("usuarios")}
        >
          Usuários
        </button>

        <button
          className={tipo === "anuncios" ? "active" : ""}
          onClick={() => setTipo("anuncios")}
        >
          Anúncios
        </button>

      </div>


      {/* BUSCA */}

      {tipo === "produtos" && (

        <div className="admin-search">

          <input
            placeholder="🔎 Buscar produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

        </div>

      )}


      {/* TABELA */}

      <div className="admin-table">

        {isLoading && (

          <div className="skeleton-container">

            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton-row"></div>
            ))}

          </div>

        )}

        {error && <p>Erro ao carregar dados</p>}


        {/* PRODUTOS */}

        {tipo === "produtos" && !isLoading && (

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>

              {produtosPagina.map(produto => (

                <tr key={produto.id}>

                  <td>{produto.id}</td>
                  <td>{produto.nome}</td>
                  <td>R$ {produto.preco}</td>
                  <td>{produto.categoria}</td>
                  <td className="status">Popular</td>

                  <td className="acoes">

                    <button
                      className="btn visualizar"
                      onClick={() => setProdutoSelecionado(produto)}
                    >
                      Ver
                    </button>

                    <button className="btn editar">
                      Editar
                    </button>

                    <button className="btn excluir">
                      Excluir
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>


      {/* PAGINAÇÃO */}

      {tipo === "produtos" && totalPaginas > 1 && (

        <div className="paginacao">

          {[...Array(totalPaginas)].map((_, i) => (

            <button
              key={i}
              className={pagina === i + 1 ? "pagina ativa" : "pagina"}
              onClick={() => setPagina(i + 1)}
            >
              {i + 1}
            </button>

          ))}

        </div>

      )}


      {/* MODAL VISUALIZAR */}

      {produtoSelecionado && (

        <div className="modal">

          <div className="modal-card">

            <h2>{produtoSelecionado.nome}</h2>

            <p><b>ID:</b> {produtoSelecionado.id}</p>
            <p><b>Preço:</b> R$ {produtoSelecionado.preco}</p>
            <p><b>Categoria:</b> {produtoSelecionado.categoria}</p>
            <p><b>Status:</b> Popular</p>

            <button
              className="btn fechar"
              onClick={() => setProdutoSelecionado(null)}
            >
              Fechar
            </button>

          </div>

        </div>

      )}

    </div>

  );

}
