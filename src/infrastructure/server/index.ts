import dotenv from "dotenv";
import express, { ErrorRequestHandler } from "express";
import { createServer as createHTTPServer, Server } from 'http';

dotenv.config()
const app = express();
const server: Server = createHTTPServer(app as any);

// errors caught in api transactions pushed here
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500).json(err);
  }
app.use(errorHandler);

server.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

export default server;