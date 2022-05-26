const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");
// const ObjectId = require("mongodb").ObjectId;

//Middlewares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wnkuo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// Routes

async function run() {
  try {
    await client.connect();
    const dbsProducts = client.db("electronicArts").collection("products");
    console.log("db connected");
    const dbsUser = client.db("electronicArts").collection("user");

    app.get("/", (req, res) => {
      res.send("Server is running");
    });

    app.get("/allproducts", async (req, res) => {
      const query = {};
      const cursor = await dbsProducts.find(query).toArray();
      res.send(cursor);
    });

    app.get("/users", async (req, res) => {
      const users = await userCollection.find({}).toArray();
      res.send(users);
    });

    // admin
    app.get("/admin/:email", async (req, res) => {
      const email = req.params.email;
      const user = await userCollection.findOne({ email: email });
      const isAdmin = user.role === "admin";
      res.send({ admin: isAdmin });
    });

    // Upload Product to DB
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, console.log(`Server is running ${port}`));
