const MySQL = require('promise-mysql2');
const CommonHelper = require('../helpers/CommonHelper');

const connectionPool = MySQL.createPool({
    host: process.env.MYSQL_CONFIG_HOST || 'localhost',
    user: process.env.MYSQL_CONFIG_USER || 'root',
    password: process.env.MYSQL_CONFIG_PASSWORD || 'password',
    database: process.env.MYSQL_CONFIG_DATABASE || 'laptop',
    port: Number(process.env.MYSQL_PORT) || 3306,
    connectionLimit: Number(process.env.MYSQL_CONN_LIMIT) || 0
});

const laptopTable = process.env.LAPTOP_TABLE || 'laptop';

// const getListPhonebook = async () => {
//   let connection = null;
//   try {
//     const timeStart = process.hrtime();

//     connection = connectionPool && (await connectionPool.getConnection());
//     const [rawResult] = await connection.query(`SELECT * FROM ${phoneBookTable}`);
//     const result = Object.values(JSON.parse(JSON.stringify(rawResult)));

//     // Log Transaction
//     const timeDiff = process.hrtime(timeStart);
//     const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
//     CommonHelper.log(['Database', 'getListPhonebook', 'INFO'], {
//       message: { timeTaken },
//       result
//     });

//     return result;
//   } catch (error) {
//     CommonHelper.log(['Database', 'getListPhonebook', 'ERROR'], {
//       message: `${error}`
//     });
//     throw error;
//   } finally {
//     if (connection) {
//       connection.release();
//     }
//   }
// };
const getListLaptop = async () => {
  let connection = null;
  try {
    const timeStart = process.hrtime();

    connection = connectionPool && (await connectionPool.getConnection());
    const [rawResult] = await connection.query(`SELECT * FROM ${laptopTable}`);
    const result = Object.values(JSON.parse(JSON.stringify(rawResult)));

    // Log Transaction
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Database', 'getListLaptop', 'INFO'], {
      message: { timeTaken },
      result
    });

    return result;
  } catch (error) {
    CommonHelper.log(['Database', 'getListPhonebook', 'ERROR'], {
      message: `${error}`
    });
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const addLaptop = async (nama,brand,processor,ram,vga,harga) => {
    let connection = null;
    try {
        const timeStart = process.hrtime();

        connection = connectionPool && (await connectionPool.getConnection());
        const query = `INSERT INTO ${laptopTable} (nama, brand, processor, ram,vga,harga) VALUES (?, ?, ?, ?,?,?)`;
        const values = [nama, brand, processor, ram,vga,harga];
        await connection.query(query, values);

        // Log Transaction
        const timeDiff = process.hrtime(timeStart);
        const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
        CommonHelper.log(['Database', 'addLaptop', 'INFO'], {
            message: { timeTaken }
        });
    } catch (error) {
        CommonHelper.log(['Database', 'addLaptop', 'ERROR'], {
            message: `${error}`
        });
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const editLaptop = async (id, nama,brand,processor,ram,vga,harga) => {
  let connection = null;
//   console.log(id)
  try {
    const timeStart = process.hrtime();

    connection = connectionPool && (await connectionPool.getConnection());
    const query = `UPDATE ${laptopTable} SET nama = ?, brand = ?, processor = ?, ram = ?, vga = ?, harga = ? WHERE id = ?`;
    const values = [nama,brand,processor,ram,vga,harga,Number(id)];
    const [result] = await connection.query(query, values);

    // Log Transaction
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Database', 'editLaptop', 'INFO'], {
      message: { timeTaken }
    });
    // console.log("---- ", typeof id)
    return result?.affectedRows > 0;
  } catch (error) {
    CommonHelper.log(['Database', 'editLaptop', 'ERROR'], {
      message: `${error}`
    });
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const deleteLaptop = async (id) => {
  let connection = null;
  try {
    const timeStart = process.hrtime();

    connection = connectionPool && (await connectionPool.getConnection());
    const query = `DELETE FROM ${laptopTable} WHERE id = ?`;
    const values = [id];
    const [result] = await connection.query(query, values);

    // Log Transaction
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Database', 'deleteLaptop', 'INFO'], {
      message: { timeTaken }
    });
    return result?.affectedRows > 0;
  } catch (error) {
    CommonHelper.log(['Database', 'Delete Laptop', 'ERROR'], {
      message: `${error}`
    });
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
// const deletePhonebook = async (id) => {
//   let connection = null;
//   try {
//     const timeStart = process.hrtime();

//     connection = connectionPool && (await connectionPool.getConnection());
//     const query = `DELETE FROM ${phoneBookTable} WHERE id = ?`;
//     const values = [id];
//     const [result] = await connection.query(query, values);

//     // Log Transaction
//     const timeDiff = process.hrtime(timeStart);
//     const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
//     CommonHelper.log(['Database', 'getListPhonebook', 'INFO'], {
//       message: { timeTaken }
//     });
//     return result?.affectedRows > 0;
//   } catch (error) {
//     CommonHelper.log(['Database', 'getListPhonebook', 'ERROR'], {
//       message: `${error}`
//     });
//     throw error;
//   } finally {
//     if (connection) {
//       connection.release();
//     }
//   }
// };

module.exports = {
    // getListPhonebook,
    getListLaptop,
    addLaptop,
    editLaptop,
    deleteLaptop
    // editPhonebook,
    // deletePhonebook
};
