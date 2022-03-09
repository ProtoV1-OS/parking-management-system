const { Request } = require("../src/Request");

describe("Request Class", () => {
  describe("Constructor", () => {
    test("Empty arg IS allowed", () => {
      expect(new Request() instanceof Request).toBeTruthy();
    });

    test("Arg IS an object", () => {
      expect(new Request({})).toBeTruthy();
    });

    test("Object arg should HAVE [uid] as a key", () => {
      expect(new Request({ uid: "unique" }).uid).toMatch(/\b(unique)\b/);
    });

    test("Object arg should HAVE [lotUID] as a key", () => {
      expect(new Request({ lotUID: "123" }).lotUID).toMatch(/\b(123)\b/);
    });

    test("Object arg should HAVE [paymentUID] as a key", () => {
      expect(new Request({ paymentUID: "123" }).paymentUID).toMatch(
        /\b(123)\b/
      );
    });

    test("Object arg should HAVE [start] as a key", () => {
      expect(
        new Request({
          start: "Thu Dec 31 0122 23:59:45 GMT-0001 (Greenwich Mean Time)",
        }).start
      ).toBeDefined();
    });

    test("Object arg should HAVE [end] as a key", () => {
      expect(
        new Request({
          end: "Thu Dec 31 0122 23:59:45 GMT-0001 (Greenwich Mean Time)",
        }).end
      ).toBeDefined();
    });

    test("Object arg should HAVE [spotType] as a key", () => {
      expect(new Request({ spotType: null }).spotType).toMatch(
        /\b(standard)\b/
      );
    });

    test("Correct ORM name is set", () => {
      expect(new Request().ORM).toMatch(/\b(REQUESTS)\b/);
    });
  });
});
