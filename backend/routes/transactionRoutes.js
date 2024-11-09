import express from "express";
import { addTxn, executeTransaction, getAllTxn, signTxn } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", getAllTxn);
router.post("/add-transaction", addTxn);
router.post("/sign-transaction", signTxn);
router.post("/execute-transaction", executeTransaction);

export default router;