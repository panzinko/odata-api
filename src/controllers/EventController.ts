import { odata, ODataController } from "odata-v4-server";
import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import { Event } from "../models/Event.js";

const dbPromise = open({
  filename: "./db/sample.db",
  driver: sqlite3.Database,
});

@odata.type(Event)
export class EventController extends ODataController {
  @odata.GET
  async find() {
    const db: Database = await dbPromise;
    return await db.all<Event[]>("SELECT * FROM Events");
  }

  @odata.GET
  async findOne(@odata.key key: number) {
    const db: Database = await dbPromise;
    return await db.get<Event>("SELECT * FROM Events WHERE id = ?", key);
  }
}
