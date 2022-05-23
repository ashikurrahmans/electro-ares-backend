const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;

//Middlewares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rfhzu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const dbs = client.db("electroart").collection("electroartCollection");
    console.log("db connected");

    app.get("/", (req, res) => {
      res.send("Server is runningy");
    });

    app.get("/allproducts", async (req, res) => {
      const query = {};
      const cursor = await dbs.find(query).toArray();
      res.send(cursor);
    });

    // Upload Product to DB
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, console.log(`Server is running ${port}`));
