import PocketBase from "pocketbase";

export const BASE_DB_URL =
  "https://jagan-workout-manager-backend.pockethost.io/";
export const pb = new PocketBase(BASE_DB_URL);


// call right after initializing the SDK
pb.autoCancellation(true);


// authenticate as auth collection record
// const userData = await pb.collection('users').authWithPassword('test@example.com', '123456');

// // or as super-admin
// const adminData = await pb.admins.authWithPassword('test@example.com', '123456');

// and much more...
