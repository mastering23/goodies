
const client = require('./client.cjs');

const createProductsTable = async () => {
  try {
    const sqlCommand = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      type VARCHAR(30) NOT NULL,
      description VARCHAR(100),
      price DECIMAL(10, 2) NOT NULL
    );
  `; 
    await client.query(sqlCommand);
    console.log('Creating user table...........✅');
  } catch (error) {
    console.log('Something went wrong .......❌', error);
  }
};


const seedAsync = async () => {
  try {
    await client.connect();
    console.log('Connection up and running.......✅');
    await createProductsTable();
    console.log('CREATED TABLE [ PRODUCTS ].......✅');
  } catch (error) {
    console.log('Error during the process.......❌', error);
  } finally {
    await client.end();
    console.log('Disconnected.......❌');
  }
};

seedAsync();