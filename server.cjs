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

app.get("/api/products/:type", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM products WHERE type = $1", [req.params.type]);

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

// app.get("/api/insertMockData", async (req, res) => {
//   try {
//     const result = await client.query("");

//     res.json(result.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// });

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
