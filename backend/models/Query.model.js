export const Query = (sequelize, DataTypes) => {
    const query = sequelize.define("query", {
      userQuery: {
        type: DataTypes.TEXT
      }
    });
  
    return query;
};