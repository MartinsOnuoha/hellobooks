
module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable('books', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            isbn: {

                type: Sequelize.STRING
            },
            title: {
                type: Sequelize.STRING
            },
            author: {
                type: Sequelize.STRING
            },
            date: {
                type: Sequelize.STRING,
                allowNull: true
            },
            description: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            category: {
                type: Sequelize.STRING,
                allowNull: false

            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });

    },
    down: function (queryInterface, Sequelize) {

        return queryInterface.dropTable('books');

    }
};
