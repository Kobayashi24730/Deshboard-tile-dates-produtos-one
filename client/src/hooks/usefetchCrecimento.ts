import { useQuery } from "@tanstack/react-query";
import { getCrecimento, vendas_vs_vendas_ano_anterior } from "../services/servicesProdutos";

export function creci() {
  return useQuery({
    queryKey: ["crecimento"],
    queryFn: getCrecimento,
    retry: 2,
    staleTime: 1000 * 60 * 5
  })
}
