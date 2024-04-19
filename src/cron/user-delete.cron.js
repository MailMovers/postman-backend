const { AppDataSource } = require('../models/dataSource');

const deleteUser = async () => {
    try {
        return await AppDataSource.query(
            `DELETE FROM users WHERE deleted_at IS NOT NULL AND deleted_at <= NOW() - INTERVAL 6 MONTH`
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = { deleteUser };
