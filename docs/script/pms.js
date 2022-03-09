import {
  Admin,
  Driver,
  Lot,
  Request,
  Payment,
  Message,
  Collection,
} from "../script/index.modern.js";

window.PMS = {
  Admin,
  Driver,
  Lot,
  Request,
  Payment,
  Message,
  Collection,

  getAdmins: () =>
    new Collection("ADMINS").then((res) => {
      console.log("\n\n- get all admins\n", res);
      return res;
    }),

  getDrivers: () =>
    new Collection("DRIVERS").then((res) => {
      console.log("\n\n- get all drivers\n", res);
      return res;
    }),

  getLots: () =>
    new Collection("LOTS").then((res) => {
      console.log("\n\n- get all lots\n", res);
      return res;
    }),

  getPayments: () =>
    new Collection("PAYMENTS").then((res) => {
      console.log("\n\n- get all payments\n", res);
      return res;
    }),

  getRequests: () =>
    new Collection("REQUESTS").then((res) => {
      console.log("\n\n- get all requests\n", res);
      return res;
    }),

  getMessages: () =>
    new Collection("MESSAGES").then((res) => {
      console.log("\n\n- get all messages\n", res);
      return res;
    }),

  getThisPayments: () =>
    new Collection("PAYMENTS").then((res) =>
      res.filter((item) => item.driverUID === thisDriver.uid)
    ),
};

console.log("------- PMS -------");
