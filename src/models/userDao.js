const { AppDataSource } = require('./dataSource');

class UserDao {
    insertUser = async ({ name, email, phone, hashedPassword, provider }) => {
        try {
            return await AppDataSource.query(
                `INSERT INTO users(name, email, password, phone, role_id, provider) VALUES (?,?,?,?,?,?)`,
                [name, email, hashedPassword, phone, 1, provider]
            );
        } catch (error) {
            throw error;
        }
    };

    findUserByEmail = async ({ email, provider }) => {
        try {
            return await AppDataSource.query(
                `SELECT * FROM users WHERE email = (?) AND provider = (?)`,
                [email, provider]
            );
        } catch (error) {
            throw error;
        }
    };

    getLocalUserInfoByUserId = async ({ userId }) => {
        try {
            return await AppDataSource.query(
                `SELECT name, email, phone, created_at FROM users WHERE id = (?) AND provider = (?)`,
                [userId, 'local']
            );
        } catch (error) {
            throw error;
        }
    };
}

module.exports = UserDao;
