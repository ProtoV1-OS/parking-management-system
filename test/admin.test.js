const { Admin } = require("../src/Admin");

describe("Admin Class", () => {
  describe("Constructor", () => {
    test("Empty arg IS allowed", () => {
      expect(new Admin() instanceof Admin).toBeTruthy();
    });

    test("Arg IS an object", () => {
      expect(new Admin({})).toBeTruthy();
    });

    test("Object arg should HAVE [uid] as a key", () => {
      expect(new Admin({ uid: "unique" }).uid).toMatch(/\b(unique)\b/);
    });

    test("Object arg should HAVE [name] as a key", () => {
      expect(new Admin({ name: "John Doe" }).name).toMatch(/\b(John Doe)\b/);
    });

    test("Object arg should HAVE [password] as a key", () => {
      expect(new Admin({ password: "p4ssw0rd" }).password).toMatch(
        /\b(p4ssw0rd)\b/
      );
    });

    test("Correct ORM name is set", () => {
      expect(new Admin().ORM).toMatch(/\b(ADMINS)\b/);
    });
  });
});
