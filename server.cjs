require('dotenv').config({ path: './.env' });
const client = require('./client.cjs'); 
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.get('/', (req, res) => {
  res.send("Nature's Goodies");
});

app.get('/products', async (req, res) => {
  try {

    await client.connect(); 

    const result = await client.query('SELECT * FROM products'); 

    res.json(result.rows);  

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  } 
    await client.end();    
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

});



