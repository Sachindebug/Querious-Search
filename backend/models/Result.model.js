export const Result = (sequelize, DataTypes) => {
    const result = sequelize.define("result", {
      question: {
        type: DataTypes.STRING
      },
      answer: {
        type: DataTypes.STRING
      },
      user: {
        type: DataTypes.STRING
      }
    });
  
    return result;
};