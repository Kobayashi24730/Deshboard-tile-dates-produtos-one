import { throws } from "node:assert";
import { useState, useEffect } from "react";
import "../styles/TabelaProdutosPageOneStyles.css";

export default function TabelaProdutosOne() {
  const [produtos, setProdutos] = useState([]);
  const [msgErro, setMsgErro] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscaprodutos() {
      try {
        const response = await fetch("https://deshboard-tile-dates-produtos-one.onrender.com/api/produtos");

        if (!response.ok) {
          throw new Error("Erro, sem data api");
        }

        const data = response.json()

        setProdutos(data.produtos);
      } catch (err) {
        console.log("Erro ao busca URL ", err.message);
        setMsgErro("Nao foi posivel carregar produtos");
      } finally {
        setLoading(false);
      }
    }

    buscaprodutos();
  }, []);

  return (
    <div className="CardAllProdutos">
      <div className="TituloCard">
        <h2>Produtos com mais demandas</h2>
        <small>nome - preco - porcentagem - demanda - lucro total</small>
      </div>
      <div className="CardLista">
        {loading && <p className="carregando" >Carregando...</p>}
        {msgErro && <p className="error" >{msgErro}</p>}
        {!loading && !msgErro && <p className="semProdutos" >Nao a produtos cadastrados...</p>}
        {produtos.map((protuto) => {
          <ul className="ListaProdutos" key={produtos.id}>
            <li>{protuto.name}</li>
            <li>{produtos.preco}</li>
          </ul>
        })};
      </div>
    </div>

  );
}
