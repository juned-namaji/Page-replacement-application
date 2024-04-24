import mongoose from "mongoose";
import "server-only";

global.mongoose = {
    conn: null,
    promise: null
}

export async function dbConnect() {
    if (global.mongoose && global.mongoose.conn) {
        console.log("Db already connected");
        return global.mongoose.conn;
    } else {
        const mongoLink = process.env.MONGO_DB_Page;
        const promise = mongoose.connect(mongoLink, {
            autoIndex: true,
        });

        global.mongoose = {
            conn: await promise,
            promise,
        };

        console.log("Connection with db has been established");

        return await promise;
    }
}