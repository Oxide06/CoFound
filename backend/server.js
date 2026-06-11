const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`CoFound Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start CoFound server:", error);
    process.exit(1);
  });