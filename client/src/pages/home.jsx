import { useEffect, useState } from "react";

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarProdutos() {
      try {
        const response = await fetch("https://deshboard-tile-dates-produtos-one.onrender.com/api/produtos");

        if (!response.ok) {
          throw new Error("Erro ao buscar produtos");
        }

        const data = await response.json();

        // 🔥 Tratamento opcional (garantir tipos corretos)
        const produtosFormatados = data.map((p) => ({
          id: p.id,
          nome: p.nome.trim(),
          preco: Number(p.preco)
        }));

        setProdutos(produtosFormatados);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarProdutos();
  }, []);

  // 🔥 Função para formatar moeda
  const formatarPreco = (valor) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  };

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Lista de Produtos</h1>

      {produtos.length === 0 ? (
        <p>Nenhum produto encontrado</p>
      ) : (
        produtos.map((produto) => (
          <div
            key={produto.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px"
            }}
          >
            <h3>{produto.nome}</h3>
            <p>{formatarPreco(produto.preco)}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
