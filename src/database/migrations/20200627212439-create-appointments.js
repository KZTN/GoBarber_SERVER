module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('appointments', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            date: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: { model: 'users', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
            },
            provider_id: {
                type: Sequelize.INTEGER,
                references: { model: 'users', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
            },
            canceled_at: {
                type: Sequelize.DATE,
                allowNull: true
            }
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('appointments');
    },
};
