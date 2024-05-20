const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");

const { sendBasicEmail } = require("./services/email-service");

const crom = require("node-cron");

const setupAndStartServer = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);

    sendBasicEmail(
      "support@admin.com",
      "notificationservicesanket@gmail.com",
      "Testing",
      "Aur bsdk"
    );

    crossOriginIsolated.schedule("*/2 * * * *", () => {
      console.log("running a task every 2 min");
    });
  });
};

setupAndStartServer();
