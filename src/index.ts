import * as dotenv from "dotenv";
dotenv.config();
import { query } from "./database";
import { Endpoint } from "./endpoints";

(async () => {
  const endpoint = new Endpoint(8000);
  const tables: [] = await query("SHOW TABLES;");
  endpoint.init(tables);
  tables.forEach((table) => {
    endpoint.generateEndpoint(table);
  });
})();
