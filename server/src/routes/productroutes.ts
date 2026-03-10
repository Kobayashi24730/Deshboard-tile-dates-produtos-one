import {
  addProdutos,
  getProdutos,
  TopVendidos,
  getAtualizacoes,
  getClients,
  AddClients
} from "../controllers/productcontrollers";
import { Router } from "express";

const router = Router();

router.get("/produtos", getProdutos);
router.post("/addprodutos", addProdutos);
router.get("/topvendidos", TopVendidos);
router.post("/addclient", AddClients);
router.post("/getclient", getClients);
router.get("/getatualizacoes", getAtualizacoes);

export default router;

