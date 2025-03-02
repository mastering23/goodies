const client = require("./client.cjs");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Nature's Goodies");
});

app.get("/api/products", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM products");

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM products WHERE id = $1", [req.params.id]);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.post("/api/products", async (req, res) => {
  const { name, type, description, price } = req.body;

  try {
    const result = await client.query(
      "INSERT INTO products (name, type, description, price) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, type, description, price]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product" });
  }
});

app.get("/test", async (req, res) => {
  res.send("test is working");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const connectToDb = async () => {
  await client.connect();
};

connectToDb();
