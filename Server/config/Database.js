//configuaration a la connexion a la base de donner
import { Sequelize } from "sequelize";
const db = new Sequelize("crudnodereact", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});
export default db;
