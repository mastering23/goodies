const client = require("./client.cjs");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.json());

const corsOptions = {
  origin: `${process.env.origin}`, // Adjust based on where the front-end is hosted
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, // If you need cookies/authentication
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Nature's Goodies");
});

// Fetch all products
app.get("/api/products", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Fetch products by type
app.get("/api/products/:type", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM products WHERE type = $1", [req.params.type]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Fetch product by id
app.get("/api/products/:id", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM products WHERE id = $1", [req.params.id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Create a new product
app.post("/api/products", async (req, res) => {
  const { name, type, description, price, imageLink } = req.body;

  try {
    const result = await client.query(
      "INSERT INTO products (name, type, description, price, image_link) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, type, description, price, imageLink]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// Update an existing product by id
app.put("/api/products/:id", async (req, res) => {
  const { name, type, description, price, imageLink } = req.body;
  const { id } = req.params;

  try {
    const result = await client.query(
      "UPDATE products SET name = $1, type = $2, description = $3, price = $4, image_link = $5 WHERE id = $6 RETURNING *",
      [name, type, description, price, imageLink, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Delete a product by id
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// Test route
app.get("/test", async (req, res) => {
  res.send("test is working");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Connect to the database
const connectToDb = async () => {
  await client.connect();
};

connectToDb();
