const { AppDataSource } = require("./dataSource");

const getPricesDao = async (writingPadId, stampId) => {
    const writingPadPrices = await AppDataSource.query(`
      SELECT id, price AS writingPadPrice
      FROM writing_pads
      WHERE id IN (?)
    `, [writingPadId]);
  
    const stampFees = await AppDataSource.query(`
      SELECT id, price AS stampFee
      FROM stamps
      WHERE id IN (?)
    `, [stampId]);
  
    const prices = writingPadIds.map((id, index) => ({
      writingPadPrice: writingPadPrices.find(price => price.id === id).writingPadPrice,
      stampFee: stampFees.find(fee => fee.id === stampIds[index]).stampFee,
    }));
  
    return prices;
  };

const paymentInsertInfoDao = async (response, letterId) => {
  const responseJson = JSON.stringify(response);
  const result = await AppDataSource.query(
    `
    INSERT INTO responses (
        response_data, letter_id
    ) VALUES (
        ?, ?
    );
    `,
    [responseJson, letterId]
  );
  return result;
};

module.exports = { paymentInsertInfoDao, getPricesDao};
