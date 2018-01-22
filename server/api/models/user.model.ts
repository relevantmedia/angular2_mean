"use strict";
import * as mongoose from "mongoose";

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
    displayName: String,
    firstName: {
        required: true,
        type: String,
    },
    lastName: {
        required: true,
        type: String,
    },
    email: {
        required:true,
        type: String,
    },
    provider: String,
    createdAt: {
        default: Date.now,
        type: Date,
    },
    updatedAt: {
        default: Date.now,
        type: Date,
    },
});

UserSchema.statics.seed = seed;

/** Seeds the User collection with document (User) and provided options.
 */
function seed(doc, options) {
    const User = mongoose.model("User");

    return new Promise( (resolve, reject) => {

        skipDocument()
            .then(add)
            .then( (response) => {
                return resolve(response);
            })
            .catch( (err) => {
              return reject(err);
            });

        function skipDocument() {
            return new Promise( (resolve, reject) => {
                User.findOne({
                    email: doc.email,
                })
                .exec( (err, existing) => {
                    if (err) { return reject(err); }
                    if (!existing) { return resolve(false); }
                    if (existing && !options.overwrite) { return resolve(true); }

                     // Remove User (overwrite)
                    existing.remove( (err) => {
                        if (err) { return reject(err); }
                        return resolve(false);
                    });
                });
            });
        }

        function add(skip) {
            return new Promise( (resolve, reject) => {
                if (skip) {
                    return resolve({
                        message: "Database Seeding: User\t\t" + doc.username + " skipped",
                    });
                }
                const user = new User(doc);
                user.provider = 'local';
                user.displayName = user.firstName + ' ' + user.lastName;

                user.save( (err) =>  {
                    if (err) { return reject(err); }
                    return resolve({
                        message: "Database Seeding: User\t\t" + user.displayName + " added",
                    });
                });
            });
        }
    });
}

export default mongoose.model("User", UserSchema);
