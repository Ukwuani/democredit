import dotenv from "dotenv";
import express, { ErrorRequestHandler , Express} from "express";
import { createServer as createHTTPServer, Server } from 'http';
import {router as OnboardingRoutes} from "src/infrastructure/routes/OnboardingRoutes";
import {router as WalletRoutes} from "src/infrastructure/routes/WalletRoutes";



dotenv.config()
const app: Express = express();
const server: Server = createHTTPServer(app);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/v1/customer", OnboardingRoutes);
app.use("/api/v1/wallet", WalletRoutes);

app.use("/",(req, res, next) => {res.send("DemoCredit")});

// errors caught in api transactions pushed here
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500).json(err);
  }
app.use(errorHandler);


server.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

export default server;