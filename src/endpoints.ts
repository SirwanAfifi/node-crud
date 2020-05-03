import * as express from "express";
import { Express, Request, Response } from "express";
import { query } from "./database";
import * as path from "path";

export class Endpoint {
  private app: Express;
  private tableName = `Tables_in_${process.env.DB}`;

  constructor(private port: number) {
    this.app = express();
    this.app.use(
      express.static(path.join(__dirname, "..", "/node_modules/bootstrap/dist"))
    );
    this.app.set("views", __dirname + "/views");
    this.app.set("view engine", "tsx");
    this.app.engine("tsx", require("express-react-views").createEngine());
  }

  init(tables: []) {
    this.app.get("/", (req: Request, res: Response) => {
      res.render("index", { tables, attributeName: this.tableName });
    });

    this.app.listen(this.port, () => {
      console.log(`Listining on port ${this.port}`);
    });
  }

  async generateEndpoint(table: {}) {
    const endpoint = table[this.tableName];
    // GET
    this.app.get(`/${endpoint}`, async (req: Request, res: Response) => {
      const showAlls = await query(`SELECT * FROM ${endpoint}`);

      res.send(showAlls);
    });

    // GET :/id
    this.app.get(
      `/${endpoint}/:id(\\d+)/`,
      async (req: Request, res: Response) => {
        const { id } = req.params;
        const PK = await query(
          `SHOW KEYS FROM ${endpoint} WHERE Key_name = 'PRIMARY'`
        );
        if (PK && PK.length > 0) {
          const showAlls = await query(
            `SELECT * FROM ${endpoint} WHERE ${PK[0].Column_name} = ${id}`
          );
          res.send(showAlls);
        } else {
          res.send({ message: "The table doesnt have a PRIMARY key" });
        }
      }
    );

    // POST
    this.app.post(`/${endpoint}`, async (req: Request, res: Response) => {
      res.send("ok");
    });

    this.app.get(`/${endpoint}/:query`, async (req: Request, res: Response) => {
      // TODO
      res.send("ok");
    });
  }
}
