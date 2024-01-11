const { INDEX_ROUTE } = require("../Routes.js");

const setupWebRoutes = (server, baseDir) => {
  server.get(INDEX_ROUTE, (req, res) => {
    res.sendFile(`${baseDir}/app/index.html`);
  });
};

module.exports = setupWebRoutes;
