import "dotenv/config";
import fs from "node:fs";
import path from "node:path";

import { pool } from "../client";

async function exec() {
  const files = fs.readdirSync(__dirname);
  const filesSQL = files.filter((file) => path.extname(file) === ".sql");

  const client = await pool.connect();

  try {
    for (const file of filesSQL) {
      console.log(`Executing SQL file: ${file}`);
      const filePath = path.join(__dirname, file);
      const sql = fs.readFileSync(filePath, "utf-8");
      await client.query(sql);
      console.log(`Successfully executed SQL file: ${file}`);
    }
    console.log("All SQL files executed successfully.");
  } catch (error) {
    console.error("Error executing SQL files:", error);
  } finally {
    client.release();
  }
}

exec();
