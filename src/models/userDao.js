const { AppDataSource } = require('./dataSource');

class UserDao {
    insertUser = async ({ name, email, phone, hashedPassword, provider, customerId }) => {
        try {
            return await AppDataSource.query(
                `INSERT INTO users(name, email, password, phone, role_id, provider, customer_id) VALUES (?,?,?,?,?,?,?)`,
                [name, email, hashedPassword, phone, 1, provider, customerId]
            );
        } catch (error) {
            throw error;
        }
    };

    getUserInfoByEmail = async ({ email, provider }) => {
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
                `SELECT name, email, phone, customer_id, created_at FROM users WHERE id = (?)`,
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

            await queryRunner.commitTransaction();
        } catch (error) {
            // 트랜잭션 실패 시 롤백.
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            // 트랜잭션 종료 시 연결 종료.
            await queryRunner.release();
        }
    };

    // Refresh Token을 DB에 저장
    setRefreshToken = async ({ userId, refreshToken }) => {
        try {
            return AppDataSource.query(`INSERT INTO tokens(user_id, refresh_token) VALUES (?,?)`, [
                userId,
                refreshToken,
            ]);
        } catch (error) {
            throw error;
        }
    };

    // Refresh Token을 DB에서 가져옴
    getRefreshToken = async ({ userId }) => {
        try {
            return AppDataSource.query(`SELECT refresh_token FROM tokens WHERE user_id = (?)`, [
                userId,
            ]);
        } catch (error) {
            throw error;
        }
    };

    // Refresh Token을 업데이트
    updateRefreshToken = async ({ userId, refreshToken }) => {
        try {
            return AppDataSource.query(
                `UPDATE tokens SET refresh_token = (?) WHERE user_id = (?)`,
                [refreshToken, userId]
            );
        } catch (error) {
            throw error;
        }
    };

    // Refresh Token 삭제
    deleteRefreshToken = async ({ userId }) => {
        try {
            return AppDataSource.query(`DELETE FROM tokens WHERE user_id = (?)`, [userId]);
        } catch (error) {
            throw error;
        }
    };
}

module.exports = UserDao;
