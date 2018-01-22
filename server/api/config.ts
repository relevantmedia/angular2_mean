import userData from "./db/user-seed-data";
export default {
    client: {
        mongodb: {
            defaultDatabase: "mongopop",
            defaultCollection: "simples",
        },
        mockarooUrl: "http://www.mockaroo.com/536ecbc0/download?count=1000&key=48da1ee0",
        // sessionSecret should be changed for security measures and concerns
        sessionSecret: process.env.SESSION_SECRET || "MEAN",
        // sessionKey is the cookie session name
        sessionKey: "sessionId",
        sessionCollection: "sessions",
    },
    db: {
        // Enable mongoose debug mode
        debug: process.env.MONGODB_DEBUG || false,
        defaultUri: "mongodb://localhost:27017/magic8",
        options: {useMongoClient: true},
        promise: global.Promise,
    },
    expressPort: 3000,
    files: {
        server: {
            models: [
                "dist/api/models/user.model.js",
            ],
        },
    },
    seedDB: {
        seed: process.env.MONGO_SEED === "true",
        options: {
          logResults: process.env.MONGO_SEED_LOG_RESULTS !== "false",
        },
        // Order of collections in configuration will determine order of seeding.
        // i.e. given these settings, the User seeds will be complete before
        // Article seed is performed.
        collections: [{
          model: "User",
          docs: userData,
        //   docs: [{
        //     data: {
        //       username: 'local-admin',
        //       email: 'admin@localhost.com',
        //       firstName: 'Admin',
        //       lastName: 'Local',
        //       roles: ['admin', 'user']
        //     }
        //   }, {
        //     // Set to true to overwrite this document
        //     // when it already exists in the collection.
        //     // If set to false, or missing, the seed operation
        //     // will skip this document to avoid overwriting it.
        //     overwrite: true,
        //     data: {
        //       username: 'local-user',
        //       email: 'user@localhost.com',
        //       firstName: 'User',
        //       lastName: 'Local',
        //       roles: ['user']
        //     }
        //   }]
        }]
      },
};
