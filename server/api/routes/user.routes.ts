import { Request, Response, Router } from "express";
import User from "../models/user.model";

const userRoutes: Router = Router();

userRoutes.get("/", (req, res, next) => {
    User.find({}, (err, doc) => {
        if (err) { next(err); }
        res.status(200).json(doc);
    });
    // res.send({"data":"users route"});
  // user.getUser(req.params.id)
  // .then(function(user) {
  //   res.status(200).json(user);
  // })
  // .catch(function(error) {
  //   next(error);
  // });
});

export { userRoutes };
