import * as bodyParser from "body-parser";
import * as express from "express";
import * as session from "express-session";
import config from "./api/config";
import seed from "./api/db/mongo-seed";
import mongooseService from "./api/db/mongoose";

// uses connect-mongo to store db connection with session data
import * as mongoConnect from "connect-mongo";
const MongoStore = mongoConnect(session);

// import routes
import {apiRoutes, appRoutes} from "./api/routes";

// Set up default mongoose connection
// const mongoDB = config.client.mongodb.defaultUri;
// mongoose.connect(mongoDB, {
//   useMongoClient: true,
// });

// Get the default connection
// const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
// db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;
  private public: string = "./dist/public";

  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.init();
    this.middleware();
    this.staticRoutes();
    this.routes();
    // this.createReadStream();
  }

  private init(): void {
    mongooseService.connect( (db) => {
      // Initialize Models
      mongooseService.loadModels(this.seedDB);

      this.initSession(db);
    });
  }

  private seedDB(): void {
    if (config.seedDB) {
      config.seedDB.seed = process.env.MONGO_SEED ? process.env.MONGO_SEED === "true" : null;
      if (config.seedDB.seed === true ) {
        console.log("Warning: Database seeding is turned on");
        seed.start();
      }
    }
  }

  private initSession(db): void {
    this.express.use(session({
      name: config.client.sessionKey,
      resave: true,
      saveUninitialized: true,
      secret: config.client.sessionSecret,
      store: new MongoStore({
        collection: config.client.sessionCollection,
        db,
      }),
    }));
  }

//   private createReadStream(): void {
//     this.express.use((req, res, next) => {

//         // if the request is not html then move along
//         var accept = req.accepts('html', 'json', 'xml');
//         if(accept !== 'html'){
//             return next();
//         }

//         // if the request has a '.' assume that it's for a file, move along
//         var ext = path.extname(req.path);
//         if (ext !== ''){
//             return next();
//         }
// console.log('route stream');
//         fs.createReadStream('./client/' + 'index.html').pipe(res);
//     });
//   }

  // Configure Express middleware.
  private middleware(): void {
    // this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    // this.express.use(passport.initialize());
    // this.express.use(passport.session());
  }

  // Configure API endpoints.
  private routes(): void {
    this.express.use("/api/v1", apiRoutes);
    this.express.use("/", appRoutes);
    // this.express.use('/auth', authRoutes);
  }

  private staticRoutes(): void {
    // in production mode run application from dist folder
    this.express.use(express.static(this.public));
  }

}

export default new App().express;
