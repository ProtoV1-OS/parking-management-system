import { C } from "./Constants";
import { Manage } from "./Manage";

interface INotificationProps {
  uid: string;
  toUserUID: string;
  content: string;
  state: C.NOTIFICATION_STATE_DISPATCHED | C.NOTIFICATION_STATE_RECEIVED;
}

export class Notification extends Manage {
  private toUserUID: INotificationProps["toUserUID"];
  private content: INotificationProps["content"];
  private state: INotificationProps["state"];

  constructor({ toUserUID, content, uid }: Partial<INotificationProps> = {}) {
    super(uid);
    this.toUserUID = toUserUID;
    this.content = content;
    this.ORM = C.ORM_NOTIFICATIONS;
  }

  modify({ state }: Partial<INotificationProps> = {}) {
    this.state = state || this.state;
    return this.put<Notification>({ uid: this.uid });
  }

  send() {
    this.state = C.NOTIFICATION_STATE_DISPATCHED;
    return this.post<Notification>();
  }
}
