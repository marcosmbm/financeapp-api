import "dotenv/config";

import { postgresHelper } from "./db/postgres/helper";

interface Result {
  result: number;
}

async function main() {
  const result = await postgresHelper<Result>("SELECT 1 + 1 as result", []);
  console.log(result[0].result);
}

main();
