const { Driver } = require("../src/Driver");

describe("Driver Class", () => {
  describe("Constructor", () => {
    test("Empty arg IS allowed", () => {
      expect(new Driver() instanceof Driver).toBeTruthy();
    });

    test("Arg IS an object", () => {
      expect(new Driver({})).toBeTruthy();
    });

    test("Object arg should HAVE [uid] as a key", () => {
      expect(new Driver({ uid: "unique" }).uid).toMatch(/\b(unique)\b/);
    });

    test("Object arg should HAVE [name] as a key", () => {
      expect(new Driver({ name: "John Doe" }).name).toMatch(/\b(John Doe)\b/);
    });

    test("Object arg should HAVE [email] as a key", () => {
      expect(new Driver({ email: "test@email.com" }).email).toMatch(
        /test@email.com/
      );
    });

    test("Object arg should HAVE [password] as a key", () => {
      expect(new Driver({ password: "p4ssw0rd" }).password).toMatch(
        /\b(p4ssw0rd)\b/
      );
    });

    test("Correct ORM name is set", () => {
      expect(new Driver().ORM).toMatch(/\b(DRIVERS)\b/);
    });
  });
});
