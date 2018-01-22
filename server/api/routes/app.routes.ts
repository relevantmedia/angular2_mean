import { Request, Response, Router } from "express";

const appRoutes: Router = Router();

appRoutes.get("/ping", (req, res, next) => {
    res.send("route pong");
  });

export { appRoutes };
