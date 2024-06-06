//CE FICHIER CONTIEN TOUT LES ROUTE QUI MAINE AU ACTION DE TRAITEMENT DUN PRODUIT
import express from "express";
//recuperation de tout les methode de traitement dun produit
//Dans le dossier Controlleur {/controllers/ProductController.js}
import {
  getProducts,
  getProductsById,
  saveProduct,
  updteProduct,
  deleteProduct,
} from "../controllers/ProductController.js";
//initialisation de la route
const router = express.Router();

//nos different Route en fonction de l'URL
router.get("/products", getProducts);
router.get("/products/:id", getProductsById);
router.post("/products", saveProduct);
router.patch("/products/:id", updteProduct);
router.delete("/products/:id", deleteProduct);
export default router;
