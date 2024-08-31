export const Result = (sequelize, DataTypes) => {
    const result = sequelize.define("result", {
      question: {
        type: DataTypes.TEXT
      },
      answer: {
        type: DataTypes.TEXT
      },
      user: {
        type: DataTypes.STRING
      }
    });
  
    return result;
};