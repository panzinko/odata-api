import { odata, ODataController, type ODataQuery } from "odata-v4-server";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { Producer } from "../models/Producer.js";

const dbPromise = open({
  filename: "./db/sample.db",
  driver: sqlite3.Database,
});

@odata.type(Producer)
export class ProducerController extends ODataController {
  @odata.GET
  async find(@odata.query query: ODataQuery): Promise<Producer[]> {
    const db = await dbPromise;
    const rows = await db.all("SELECT * FROM Producers");
    return rows;
  }
}
