//importation des dependancesW
import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
//IMPORTATION DES ROUTE DANS LE POINT DENTRE DE NOTRE APP
import ProductRoute from "./routes/ProductRoute.js";
//Creation de notre App express
const app = express();
//nos different middelware
app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(ProductRoute);
//server runing
app.listen(4000, () => {
  console.log("server started on port 4000");
});
