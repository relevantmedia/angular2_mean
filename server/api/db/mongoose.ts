import * as mongoose from "mongoose";
import * as path from "path";
import config from "../config";

// Load the mongoose models
const loadModels = (callback?) => {
  // Globbing model files
  config.files.server.models.forEach( (modelPath) => {
    require(path.resolve(modelPath));
  });

  if (callback) { callback(); }
};

// Initialize Mongoose
const connect = (callback) => {
    mongoose.Promise = config.db.promise;

    mongoose
      .connect(config.db.defaultUri, config.db.options)
      .then((connection) => {
        // Enabling mongoose debug mode if required
        mongoose.set("debug", config.db.debug);

        // Call callback FN
        if (callback) { callback(connection.db); }
      })
      .catch( (err) =>  {
        // console.error(chalk.red('Could not connect to MongoDB!'));
        console.log(err);
      });

  };

const disconnect = (cb) => {
    mongoose.connection.db
      .close( (err) => {
        // console.info(chalk.yellow('Disconnected from MongoDB.'));
        return cb(err);
      });
  };

export default { connect, disconnect, loadModels };
