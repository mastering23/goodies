const client = require('./client.cjs'); 
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Nature's Goodies");
});

app.get('/api/products', async (req, res) => {
  try {

    const result = await client.query('SELECT * FROM products'); 

    res.json(result.rows);  

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  } 
});

app.get('/test', async (req, res) => {
  res.send("test is working");
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

});

const connectToDb = async () => {
  await client.connect();
}

connectToDb();



