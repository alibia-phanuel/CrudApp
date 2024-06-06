import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;
const Product = db.define(
  "product",
  {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    //contien le lien ou est garder notre image
    url: DataTypes.STRING,
  }, 
  {
    freezeTableName: true,
  }
);
export default Product;
(async () => {
  await db.sync();
})();
