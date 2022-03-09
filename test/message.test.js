const { Message } = require("../src/Message");

describe("Message Class", () => {
  describe("Constructor", () => {
    test("Empty arg IS allowed", () => {
      expect(new Message() instanceof Message).toBeTruthy();
    });

    test("Arg IS an object", () => {
      expect(new Message({})).toBeTruthy();
    });

    test("Object arg should HAVE [uid] as a key", () => {
      expect(new Message({ uid: "unique" }).uid).toMatch(/\b(unique)\b/);
    });

    test("Object arg should HAVE [toUserUID] as a key", () => {
      expect(new Message({ toUserUID: "123" }).toUserUID).toMatch(/\b(123)\b/);
    });

    test("Object arg should HAVE [fromUserUID] as a key", () => {
      expect(new Message({ fromUserUID: "456" }).fromUserUID).toMatch(
        /\b(456)\b/
      );
    });

    test("Object arg should HAVE [replyToRef] as a key", () => {
      expect(new Message({ replyToRef: "789" }).replyToRef).toMatch(
        /\b(789)\b/
      );
    });

    test("Object arg should HAVE [title] as a key", () => {
      expect(new Message({ title: "a title" }).title).toMatch(/\b(a title)\b/);
    });

    test("Object arg should HAVE [content] as a key", () => {
      expect(new Message({ content: "some content" }).content).toMatch(
        /\b(some content)\b/
      );
    });

    test("Object arg should HAVE [toUserUIDS] as a key", () => {
      expect(
        new Message({ toUserUIDS: ["123", "456", "789"] }).mem.length
      ).toBe(3);
    });

    test("Class should NOT HAVE [toUserUIDS] as a property", () => {
      expect(
        new Message({ toUserUIDS: ["123", "456", "789"] }).toUserUIDS
      ).toBeFalsy();
    });

    test("Correct ORM name is set", () => {
      expect(new Message().ORM).toMatch(/\b(MESSAGES)\b/);
    });
  });
});
