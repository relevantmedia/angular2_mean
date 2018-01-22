"use strict";
import * as mongoose from "mongoose";
import config from "../config";

export default {start};

function start(seedConfig?) {
  return new Promise( (resolve, reject) => {
    seedConfig = seedConfig || {};

    const options = seedConfig.options || (config.seedDB ? Object.assign({}, config.seedDB.options) : {});
    const collections = seedConfig.collections || (config.seedDB.collections ? config.seedDB.collections : []);

    if (!collections.length) {
      return resolve();
    }

    const seeds = collections
      .filter( (collection) => {
        return collection.model;
      });

    // Use the reduction pattern to ensure we process seeding in desired order.
    seeds.reduce( (p, item) => {
      return p.then( () => {
        return seed(item, options);
      });
    }, Promise.resolve()) // start with resolved promise for initial previous (p) item
      .then(onSuccessComplete)
      .catch(onError);

    // Local Promise handlers

    function onSuccessComplete() {
      if (options.logResults) {
        console.log("Database Seeding: Mongo Seed complete!");
      }

      return resolve();
    }

    function onError(err) {
      if (options.logResults) {
        console.log('Database Seeding: Mongo Seed Failed!');
      }

      return reject(err);
    }

  });
}

function seed(collection, options) {
  // Merge options with collection options
  options = options || Object.assign({}, collection.options);

  return new Promise( (resolve, reject) => {
    const Model = mongoose.model(collection.model);
    const docs = collection.docs;

    const skipWhen = collection.skip ? collection.skip.when : null;

    if (!Model.seed) {
      return reject(new Error('Database Seeding: Invalid Model Configuration - ' + collection.model + '.seed() not implemented'));
    }

    if (!docs || !docs.length) {
      return resolve();
    }

    // First check if we should skip this collection
    // based on the collection's "skip.when" option.
    // NOTE: If it exists, "skip.when" should be a qualified
    // Mongoose query that will be used with Model.find().
    skipCollection()
      .then(seedDocuments)
      .then( () => {
        return resolve();
      })
      .catch( (err) => {
        return reject(err);
      });

    function skipCollection() {
      return new Promise( (resolve, reject) => {
        if (!skipWhen) {
          return resolve(false);
        }

        Model
          .find(skipWhen)
          .exec( (err, results) => {
            if (err) {
              return reject(err);
            }

            if (results && results.length) {
              return resolve(true);
            }

            return resolve(false);
          });
      });
    }

    function seedDocuments(skipCollection) {
      return new Promise( (resolve, reject) => {

        if (skipCollection) {
          return onComplete([{ message: 'Database Seeding: ' + collection.model + ' collection skipped' }]);
        }

        const workload = docs
          .filter( (doc) => {
            return doc.data;
          })
          .map( (doc) => {
            return Model.seed(doc.data, { overwrite: doc.overwrite });
          });

        Promise.all(workload)
          .then(onComplete)
          .catch(onError);

        // Local Closures

        function onComplete(responses) {
          if (options.logResults) {
            responses.forEach( (response) => {
              if (response.message) {
                console.log(response.message);
              }
            });
          }

          return resolve();
        }

        function onError(err) {
          return reject(err);
        }
      });
    }
  });
}