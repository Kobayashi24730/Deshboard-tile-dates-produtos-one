import { useState,useEffect } from "react";
import LinearChartComponents from "./charts/LineChartComponents";
import { ChartData } from "../types/chartTypes";

export default function Gaficos(){
  const [data, setData] = useState<ChartData[]>([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscadedados(){
      try {
        const response = await fetch("https://deshboard-tile-dates-produtos-one.onrender.com/api/produtos");
        if(!response.ok){
          throw new Error("Erro ao busca data na API!!");
        }

        const data = await response.json();
        const DadosFormatados = data.map((produto: any) => ({
          nome: produto.nome,
          value: produto.preco
        }));
        setData(DadosFormatados);
      } catch (err) {
        console.log("Erro ao busca dados do gafico: ", err.message);
        setErro("Erro ao busca dados do grafico.");
      }
    }
  }, []);

  return(
    <div>
      <LinearChartComponents data={data} />
    </div>
  );
}
