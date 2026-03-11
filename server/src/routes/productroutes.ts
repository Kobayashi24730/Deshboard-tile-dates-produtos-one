import {
  addProdutos,
  getProdutos,
  TopVendidos,
  getAtualizacoes,
  getClients,
  AddClients,
  AllVendas,
  taxa_sucesso,
  vendas_vs_vendas_ano_anterior
} from "../controllers/productcontrollers";
import { Router } from "express";

const router = Router();

router.get("/produtos", getProdutos);
router.post("/addprodutos", addProdutos);
router.get("/topvendidos", TopVendidos);
router.post("/addclient", AddClients);
router.get("/getclient", getClients);
router.get("/getatualizacoes", getAtualizacoes);
router.get("/allvendas", AllVendas);
router.get("/taxasucesso", taxa_sucesso);
router.get("/crecimento", vendas_vs_vendas_ano_anterior);

export default router;

