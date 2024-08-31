export const Related = (sequelize, DataTypes) => {
    const related = sequelize.define("related", {
      question: {
        type: DataTypes.TEXT
      }
    });
  
    return related;
};