import { DataTypes } from "sequelize";
import DB from "../config/database.js";

const User = DB.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  { paranoid: true }
);

export default User;

(async () => {
  // await DBSETTINGS.sync({ alter: true });
  await DB.sync().then(() => console.log("db is ready"));
})();
