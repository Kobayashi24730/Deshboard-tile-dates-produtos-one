import { useState, useEffect } from "react";
import LinearChartComponents from "./charts/LineChartComponents";
import { ChartData } from "../types/chartTypes";
import "../styles/GraficosStyles.css";


export default function Gaficos() {
  const [data, setData] = useState<ChartData[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscadedados() {
      try {
        const response = await fetch("https://deshboard-tile-dates-produtos-one.onrender.com/api/produtos");
        if (!response.ok) {
          throw new Error("Erro ao busca data na API!!");
        }

        const result = await response.json();
        const DadosFormatados = result.produtos.map((produto: any) => ({
          nome: produto.nome,
          value: produto.preco
        }));
        setData(DadosFormatados);
      } catch (err) {
        if (err instanceof Error) {
          console.log("Erro ao busca dados do gafico: ", err.message);
        }
        setErro("Erro ao busca data.");
      } finally {
        setLoading(false);
      }
    }

    buscadedados();
  }, []);

  return (
    <div className="div-graficos-one">
      {loading && <div className="loading-grafico-one" >Carregando...</div>}
      {erro && <div className="erro-grafico-one">{erro}</div>}
      <LinearChartComponents data={data} />
    </div>
  );
}
