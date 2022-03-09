const { Payment } = require("../src/Payment");

describe("Payment Class", () => {
  describe("Constructor", () => {
    test("Empty arg IS allowed", () => {
      expect(new Payment() instanceof Payment).toBeTruthy();
    });

    test("Arg IS an object", () => {
      expect(new Payment({})).toBeTruthy();
    });

    test("Object arg should HAVE [uid] as a key", () => {
      expect(new Payment({ uid: "unique" }).uid).toMatch(/\b(unique)\b/);
    });

    test("Object arg should HAVE [driverUID] as a key", () => {
      expect(new Payment({ driverUID: "123" }).driverUID).toMatch(/\b(123)\b/);
    });

    test("Object arg should HAVE [name] as a key", () => {
      expect(new Payment({ name: "John Doe" }).name).toMatch(/\b(John Doe)\b/);
    });

    test("Object arg should HAVE [ccn] as a key", () => {
      expect(new Payment({ ccn: "123" }).ccn).toMatch(/\b(123)\b/);
    });

    test("Object arg should HAVE [ccv] as a key", () => {
      expect(new Payment({ ccv: "123" }).ccv).toMatch(/\b(123)\b/);
    });

    test("Object arg should HAVE [exp] as a key", () => {
      expect(
        new Payment({
          exp: "Thu Dec 31 0122 23:59:45 GMT-0001 (Greenwich Mean Time)",
        }).exp
      ).toBeDefined();
    });

    test("Correct ORM name is set", () => {
      expect(new Payment().ORM).toMatch(/\b(PAYMENTS)\b/);
    });
  });
});
