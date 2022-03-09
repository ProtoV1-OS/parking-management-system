const { Lot } = require("../src/Lot");

describe("Lot Class", () => {
  describe("Constructor", () => {
    test("Empty arg IS allowed", () => {
      expect(new Lot() instanceof Lot).toBeTruthy();
    });

    test("Arg IS an object", () => {
      expect(new Lot({})).toBeTruthy();
    });

    test("Object arg should HAVE [uid] as a key", () => {
      expect(new Lot({ uid: "unique" }).uid).toMatch(/\b(unique)\b/);
    });

    test("Object arg should HAVE [name] as a key", () => {
      expect(new Lot({ name: "Big Park" }).name).toMatch(/\b(Big Park)\b/);
    });

    test("Object arg should HAVE [coordinate] as a key", () => {
      expect(new Lot({ coordinate: "12345" }).coordinate).toMatch(
        /\b(12345)\b/
      );
    });

    test("Object arg should HAVE [capacity] as a key", () => {
      expect(new Lot({ capacity: 10 }).spots.length).toEqual(10);
    });

    test("Correct ORM name is set", () => {
      expect(new Lot().ORM).toMatch(/\b(LOTS)\b/);
    });
  });
});
