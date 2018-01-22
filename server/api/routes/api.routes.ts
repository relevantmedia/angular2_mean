import { Request, Response, Router } from "express";
import { userRoutes } from "./user.routes";

const apiRoutes: Router = Router();

apiRoutes.get("/pop", (req, res, next) => {
    // This isn't part of API and is just used from a browser or curl to test that
    // "/pop" is being routed correctly.

    const testObject = {
        "AppName": "MongoPop",
        "Version": 1.0
    }
    res.json(testObject);
});

apiRoutes.use("/users", userRoutes);

export { apiRoutes };
