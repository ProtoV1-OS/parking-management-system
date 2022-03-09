import { C } from "./Constants";
import { Manage } from "./Manage";

interface IMessageProps {
  uid: string;
  toUserUID: string;
  toUserUIDS: string[];
  fromUserUID: string;
  replyToRef: string;
  title: string;
  content: string;
  state: C.MESSAGE_STATE_DELIVERED | C.MESSAGE_STATE_READ;
}

export class Message extends Manage {
  toUserUID: IMessageProps["toUserUID"];
  fromUserUID: IMessageProps["fromUserUID"];
  replyToRef: IMessageProps["replyToRef"];
  title: IMessageProps["title"];
  content: IMessageProps["content"];
  state: IMessageProps["state"];

  constructor({
    toUserUID,
    toUserUIDS,
    fromUserUID,
    title,
    content,
    replyToRef,
    uid,
  }: Partial<IMessageProps> = {}) {
    super(uid);
    this.mem = toUserUIDS;
    this.toUserUID = toUserUID;
    this.fromUserUID = fromUserUID;
    this.replyToRef = replyToRef;
    this.title = title;
    this.content = content;
    this.ORM = C.ORM_MESSAGES;
    this.state = C.MESSAGE_STATE_DELIVERED;
  }

  modify({ state }: Partial<IMessageProps> = {}) {
    this.state = state || this.state;
    return this.put<Message>({ uid: this.uid });
  }

  send() {
    let result = [];
    for (let i = 0; i < this.mem.length; i++) {
      result.push(
        new Message({
          toUserUID: this.mem[i],
          fromUserUID: this.fromUserUID,
          title: this.title,
          content: this.content,
          replyToRef: this.replyToRef,
        }).post<Message>()
      );
    }
    return Promise.all(result);
  }
}
