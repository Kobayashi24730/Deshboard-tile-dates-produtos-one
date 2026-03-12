import { useQuery } from "@tanstack/react-query";
import { delProdutos } from "../services/servicesProdutos";

export function ExcluirProduto() {
  return useQuery({
    queryKey: ["produto"],
    queryFn: delProdutos,
    retry: 2,
    staleTime: 1000 * 60 * 5
  });
}
