require("dotenv").config();
import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import router from "./routes/routes";

const port = process.env.PORT || 5000;
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": false}));

app.use("/api", router);

app.listen(port, (err) => {

    if (err) {
        console.log(err);
    }
    console.log("Server running on port " + port);

});

export default app;
