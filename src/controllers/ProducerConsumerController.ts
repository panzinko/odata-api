import { odata, ODataController } from "odata-v4-server";
import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import { ProducerConsumer } from "../models/ProducerConsumer.js";

const dbPromise = open({
  filename: "./db/sample.db",
  driver: sqlite3.Database,
});

export class ProducerConsumerController extends ODataController {
  @odata.GET
  async find() {
    const db: Database = await dbPromise;
    return await db.all<ProducerConsumer[]>("SELECT * FROM ProducerConsumer");
  }
}
