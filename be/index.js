import express from "express";
import bodyParser from "body-parser";
import route from "./routes/route.js"
import { connectDB } from "./database/database.js";

const app = express();
const port = 8000;

connectDB();
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());

    // routes
    app.use("/", route);

    app.listen(port, function () {
      console.log(`🚀 Fire app listening on port ${port}!`);
    }
);