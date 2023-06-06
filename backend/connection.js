import {dbConfig} from "./config/db.config.js";
import Sequelize from "sequelize";
import {Query} from './models/Query.model.js';
import {Related} from './models/Related.model.js';
import {Result} from './models/Result.model.js';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port : dbConfig.PORT,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.query = Query(sequelize, Sequelize);
db.related = Related(sequelize, Sequelize);
db.result = Result(sequelize, Sequelize);


db.query.hasMany(db.related, { as: "related_questions" });
db.related.belongsTo(db.query, {
  foreignKey: "queryId",
  as: "query",
});

db.query.hasMany(db.result, { as: "results" });
db.result.belongsTo(db.query, {
  foreignKey: "queryId",
  as: "query",
});
export default db;