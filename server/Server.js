const path = require("path");
const express = require("express");
const cors = require("cors");
const setupWebRoutes = require("./routes/web/WebRoutes");
const setupApiRoutes = require("./routes/api/ApiRoutes");

require("dotenv").config();

const PORT = process.env.EXPRESS_PORT || 5000;
const BASE_DIR = path.resolve(__dirname, "../../dist");
const DEV = process.env.NODE_ENV !== "production";

const server = express();

// CORS support.
server.use(cors());

// JSON support.
server.use(express.json());

// Static routes.
server.use(express.static(`${BASE_DIR}/app`));

// Web routes.
setupWebRoutes(server, BASE_DIR);

// API routes.
setupApiRoutes(server);

server.listen(PORT, () => {
  console.log(
    `App (${
      DEV ? "development" : "production"
    }) listening at http://localhost:${PORT}`
  );
});
