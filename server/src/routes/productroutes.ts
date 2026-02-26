import { addProdutos,getProdutos } from "../controllers/productcontrollers";
import { Router } from "express";

const router = Router();

router.get("/produtos", getProdutos);
router.post("/", addProdutos);

export default router;

