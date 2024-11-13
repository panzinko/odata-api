import { open } from "sqlite";
import sqlite3 from "sqlite3";

async function initializeDatabase() {
  const db = await open({
    filename: "./db/sample.db",
    driver: sqlite3.Database,
  });

  // Create tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS Producers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Consumers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS ProducerConsumer (
      producer_id INTEGER,
      consumer_id INTEGER,
      PRIMARY KEY (producer_id, consumer_id),
      FOREIGN KEY (producer_id) REFERENCES Producers(id),
      FOREIGN KEY (consumer_id) REFERENCES Consumers(id)
    );

    CREATE TABLE IF NOT EXISTS Events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_name TEXT NOT NULL,
      producer_id INTEGER,
      consumer_id INTEGER,
      FOREIGN KEY (producer_id) REFERENCES Producers(id),
      FOREIGN KEY (consumer_id) REFERENCES Consumers(id)
    );
  `);

  // Insert sample data
  await db.exec(`
    -- Insert Producers
    INSERT OR IGNORE INTO Producers (id, name) VALUES
      (1, 'Producer A'),
      (2, 'Producer B'),
      (3, 'Producer C');

    -- Insert Consumers
    INSERT OR IGNORE INTO Consumers (id, name) VALUES
      (1, 'Consumer X'),
      (2, 'Consumer Y'),
      (3, 'Consumer Z');

    -- Create Producer-Consumer relationships
    INSERT OR IGNORE INTO ProducerConsumer (producer_id, consumer_id) VALUES
      (1, 1),
      (1, 2),
      (2, 2),
      (3, 1),
      (3, 3);

    -- Insert Events
    INSERT OR IGNORE INTO Events (event_name, producer_id, consumer_id) VALUES
      ('Login Event', 1, 1),
      ('Purchase Event', 2, 2),
      ('Logout Event', 1, 1),
      ('Registration Event', 3, 3),
      ('Payment Event', 2, 2);
  `);

  console.log("Database initialized successfully");
  await db.close();
}

initializeDatabase().catch(console.error);
