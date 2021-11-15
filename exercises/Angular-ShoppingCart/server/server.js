var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var https = require("https");
var privateKey = fs.readFileSync("../key.pem", "utf8");
var certificate = fs.readFileSync("../cert.pem", "utf8");
var credentials = { key: privateKey, cert: certificate };
var app = express();

var WooCommerceAPI = require("@woocommerce/woocommerce-rest-api").default;
var WooCommerce = new WooCommerceAPI({
  url: "https://myshop.gigya-cs.com/",
  consumerKey: "ck_fd2fe536455f1d9891e0603b178139a3f3ddaa50",
  consumerSecret: "cs_c216cd8894207bf54adbbfb433884c23227944f8",
  version: "wc/v3",
});

var cors = require("cors");

// your express configuration here
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(3000, () => {
  console.log("Running on port 3000");

  WooCommerce.get("products").then((prod) => {
    // console.log('products', prod.data)
    products = prod.data;
  });

  function postOrders(orders) {}
});

// Define the JSON parser as a default way
// to consume and produce data through the
// exposed APIs
app.use(bodyParser.json());

app.use(cors({ origin: "*" }));

var products;
var newCustomer;

/*  "/api/status"
 *   GET: Get server status
 *   PS: it's just an example, not mandatory
 */
app.get("/api/status", function (req, res) {
  res.status(200).json({ status: "UP" });
});

app.get("/products", (req, res) => {
  res.status(200).json(products);
});

app.post("/customers", (req, res) => {
  console.log("server post customer");
  WooCommerce.post("customers", req.body).then((nCustomer) => {
    console.log("customers", newCustomer);
    newCustomer = nCustomer;
  });
  res.status(200).json(newCustomer);
});

app.post("/orders", (req, res) => {
  console.log("server post order");
  WooCommerce.post("orders", req.body).then((ordersRes) => {
    console.log("ordersRes", ordersRes);
  });
  res.status(200).json(ordersRes);
});
