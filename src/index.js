const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");

const TicketController = require("./controllers/ticket-controller");

const jobs = require("./utils/job");
const { subscribeMessage, createChannel } = require("./utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("./config/serverConfig");

const EmailService = require("./services/email-service");

const setupAndStartServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const channel = await createChannel();
  subscribeMessage(
    channel,
    EmailService.subscribedEvents,
    REMINDER_BINDING_KEY
  );

  app.post("/api/v1/tickets", TicketController.create);

  app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
    jobs();
  });
};

setupAndStartServer();
