const { Notification } = require("../src/Notification");

describe("Notification Class", () => {
  describe("Constructor", () => {
    test("Empty arg IS allowed", () => {
      expect(new Notification() instanceof Notification).toBeTruthy();
    });

    test("Arg IS an object", () => {
      expect(new Notification({})).toBeTruthy();
    });

    test("Object arg should HAVE [uid] as a key", () => {
      expect(new Notification({ uid: "unique" }).uid).toMatch(/\b(unique)\b/);
    });

    test("Object arg should HAVE [toUserUID] as a key", () => {
      expect(new Notification({ toUserUID: "123" }).toUserUID).toMatch(
        /\b(123)\b/
      );
    });

    test("Object arg should HAVE [content] as a key", () => {
      expect(new Notification({ content: "some content" }).content).toMatch(
        /\b(some content)\b/
      );
    });

    test("Correct ORM name is set", () => {
      expect(new Notification().ORM).toMatch(/\b(NOTIFICATIONS)\b/);
    });
  });
});
