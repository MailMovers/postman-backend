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

    getPhoneByUserId = async ({ userId }) => {
        try {
            return await AppDataSource.query(`SELECT email, phone FROM users WHERE id = (?)`, [
                userId,
            ]);
        } catch (error) {
            throw error;
        }
    };

    updateUserPhone = async ({ userId, newPhone }) => {
        try {
            return await AppDataSource.query(`UPDATE users SET phone = (?) WHERE id = (?)`, [
                newPhone,
                userId,
            ]);
        } catch (error) {
            throw error;
        }
    };

    withdrawal = async ({ userId, reason }) => {
        const queryRunner = AppDataSource.createQueryRunner();

        // 트랜잭션 사용을 위해 queryRunner 연결.
        await queryRunner.connect();
        // 트랜잭션 시작.
        await queryRunner.startTransaction();
        try {
            /* 비즈니스 로직.. */
            // 탈퇴사유 저장
            await queryRunner.manager.query(
                `INSERT INTO user_deletion_reasons(reason) VALUES (?)`,
                [reason]
            );

            // 회원탈퇴 - Soft Delete
            await queryRunner.manager.query(`UPDATE users SET deleted_at = (?) WHERE id = (?)`, [
                new Date(),
                userId,
            ]);
        } catch (error) {
            // 트랜잭션 실패 시 롤백.
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            // 트랜잭션 종료 시 연결 종료.
            await queryRunner.release();
        }
    };
}

module.exports = UserDao;
