import { odata, ODataController, ODataQuery } from "odata-v4-server";
import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import { Consumer } from "../models/Consumer.js";

const dbPromise = open({
  filename: "./db/sample.db",
  driver: sqlite3.Database,
});

@odata.type(Consumer)
export class ConsumerController extends ODataController {
  @odata.GET
  async find(@odata.query query: ODataQuery): Promise<Consumer[]> {
    const db: Database = await dbPromise;
    return await db.all<Consumer[]>("SELECT * FROM Consumers");
  }

  @odata.GET
  async findOne(@odata.key key: number): Promise<Consumer | undefined> {
    const db: Database = await dbPromise;
    return await db.get<Consumer>("SELECT * FROM Consumers WHERE id = ?", key);
  }
}
