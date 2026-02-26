import {Pool} from "pg";
import {drizzle} from "drizzle-orm/node-postgres";
import * as schema from "./schema" ;
import "dotenv/config";
import { response } from "express";

const pool = new Pool({
  connectionString: process.env.DATA_URL
});

export const db = drizzle(pool, { schema });

pool.query("SELECT NOW()")
  .then(res => console.log(res.rows) )
  .catch(err => console.error(err) );
