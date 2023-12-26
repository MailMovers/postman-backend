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

    getUserInfoByUserId = async ({ userId }) => {
        try {
            return await AppDataSource.query(
                `SELECT name, email, phone, created_at FROM users WHERE id = (?)`,
                [userId]
            );
        } catch (error) {
            throw error;
        }
    };

    getPasswordByUserId = async ({ userId }) => {
        try {
            return await AppDataSource.query(`SELECT email, password FROM users WHERE id = (?)`, [
                userId,
            ]);
        } catch (error) {
            throw error;
        }
    };

    updateUserPassword = async ({ userId, hashedNewPassword }) => {
        try {
            return await AppDataSource.query(
                `
                UPDATE users SET password = (?) WHERE id = (?)`,
                [hashedNewPassword, userId]
            );
        } catch (error) {
            throw error;
        }
    };
}

module.exports = UserDao;
