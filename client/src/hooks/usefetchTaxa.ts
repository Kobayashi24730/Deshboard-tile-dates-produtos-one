import { useQuery } from "@tanstack/react-query";
import { taxavalor, getTaxaSucesso } from "../services/servicesProdutos";

export function Taxa() {
  return useQuery<taxavalor[]>({
    queryKey: ["taxa"],
    queryFn: getTaxaSucesso,
    retry: 2,
    staleTime: 1000 * 60 * 5
  })
}
