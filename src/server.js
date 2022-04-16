import "dotenv/config";
import express from "express";
import UserController from "./app/controllers/UserController";
// import BullBoard from 'bull-board';
import Queue from "./app/lib/Queue";
const { createBullBoard } = require("bull-board");
const { BullAdapter } = require("bull-board/bullAdapter");
const { BullMQAdapter } = require("bull-board/bullMQAdapter");

const app = express();

const { router, setQueues } = createBullBoard([]);
setQueues(Queue.queues.map((q) => new BullAdapter(q.bull)));

app.use(express.json());
app.post("/users", UserController.store);
app.use("/admin/queues", router);

app.listen(3333, () => {
  console.log("Servidor iniciado em localhost:3333");
});
