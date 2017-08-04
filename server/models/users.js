
module.exports = (sequelize, DataTypes) => {

    const users = sequelize.define("users", {
        '"email"': DataTypes.STRING,
        "membership": DataTypes.STRING,
        "password": DataTypes.STRING,
        "username": DataTypes.STRING
    }, {
        "freezeTableName": true,
        "classMethods": {
            associate (models) {
            // Associations can be defined here
            }
        }
    });

    return users;

};