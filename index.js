import express from "express";
import bodyParser from "body-parser";
import monstersRoute from "./routes/monster.route.js";
import { connectDB } from "./database/database.js";

const port = 8000;

connectDB();
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());

    // routes
    app.use("/", monstersRoute);

    app.listen(port, function () {
      console.log(`🚀 Fire app listening on port ${port}!`);
    }
);