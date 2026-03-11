import { useQuery } from "@tanstack/react-query"
import { getProdutos } from "../services/servicesProdutos";

export function useProdutos() {
  return useQuery({
    queryKey: ["produtos"],
    queryFn: getProdutos
  });
}
