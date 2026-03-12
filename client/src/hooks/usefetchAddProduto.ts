import { useQuery } from "@tanstack/react-query";
import { addProdutos, Produtos } from "../services/servicesProdutos";

export function addproduto() {
  return useQuery<Produtos[]>({
    queryKey: ["produtos"],
    queryFn: addProdutos,
    retry: 2,
    staleTime: 1000 * 60 * 5
  });
}
