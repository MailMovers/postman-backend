const { AppDataSource } = require('./dataSource');

class UserDao {
    insertUser = async ({ name, email, phone, hashedPassword }) => {
        try {
            return await AppDataSource.query(
                `INSERT INTO users(name, email, password, phone, role_id) VALUES (?,?,?,?,?)`,
                [name, email, hashedPassword, phone, 1]
            );
        } catch (error) {
            throw error;
        }
    };

    findUserByEmail = async ({ email }) => {
        try {
            return await AppDataSource.query(`SELECT * FROM users WHERE email = (?)`, [email]);
        } catch (error) {
            throw error;
        }
    };
}

module.exports = UserDao;
