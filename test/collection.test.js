const { Admin } = require("../src/Admin");
const { Collection } = require("../src/Collection");
const { Driver } = require("../src/Driver");
const { Lot } = require("../src/Lot");
const { Message } = require("../src/Message");
const { Notification } = require("../src/Notification");
const { Payment } = require("../src/Payment");
const { Request } = require("../src/Request");

describe("Collection Class", () => {
  describe("Constructor", () => {
    test("Correct ORM name is passed as arg", () => {
      expect(
        new Collection("ADMINS").constructor instanceof Admin.constructor
      ).toBeTruthy();
      expect(
        new Collection("DRIVERS").constructor instanceof Driver.constructor
      ).toBeTruthy();
      expect(
        new Collection("LOTS").constructor instanceof Lot.constructor
      ).toBeTruthy();
      expect(
        new Collection("REQUESTS").constructor instanceof Request.constructor
      ).toBeTruthy();
      expect(
        new Collection("PAYMENTS").constructor instanceof Payment.constructor
      ).toBeTruthy();
      expect(
        new Collection("MESSAGES").constructor instanceof Message.constructor
      ).toBeTruthy();
      expect(
        new Collection("NOTIFICATIONS").constructor instanceof
          Notification.constructor
      ).toBeTruthy();
    });
  });

  describe("method [then]", () => {
    test("Check list \n- Accepts a function as arg \n- passes the accepted function a list \n- returns a promise which resolves with the collection", () => {
      const callback = (list) => {
        expect(Array.isArray(list)).toBeTruthy();
        return list;
      };
      new Collection("ADMINS")
        .then(callback)
        .then(() =>
          new Collection("DRIVERS")
            .then(callback)
            .then(() =>
              new Collection("LOTS")
                .then(callback)
                .then(() =>
                  new Collection("REQUESTS")
                    .then(callback)
                    .then(() =>
                      new Collection("PAYMENTS")
                        .then(callback)
                        .then(() =>
                          new Collection("MESSAGES")
                            .then(callback)
                            .then(() =>
                              new Collection("NOTIFICATIONS").then(callback)
                            )
                        )
                    )
                )
            )
        )
        .then((returnValue) => expect(Array.isArray(returnValue)).toBeTruthy());
    });
  });
});
